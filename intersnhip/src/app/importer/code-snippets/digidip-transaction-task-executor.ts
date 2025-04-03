const digidipTransactionTaskExecutorCode = `/**
 *  Orchestrates the importing process.
 *  1) Fetch transactions using DigidipApiClient
 *  2) Parses the transactions using DigidipParser
 *  3) Persists the result to DB
 */
@Service
class DigidipTransactionTaskExecutor(
    private val networkRestRepository: NetworkRestRepository,
    private val merchantRestRepository: MerchantRestRepository,
    private val transactionRestRepository: TransactionRestRepository,
    private val digidipParser: DigidipParser,
    private val transactionTemplate: TransactionTemplate,
    private val digidipApiClient: DigidipApiClient
) {

    companion object {
        val LOG: Logger = LoggerFactory.getLogger(DigidipTransactionTaskExecutor::class.java)
        const val NO_INITIAL_DATA = -1L
    }

    internal fun executeTask(pScheduleAndData: ScheduleAndTimestampOffset, networkName: String): ScheduleAndTimestampOffset {

        val digidipOptional: Optional<Network> = networkRestRepository.findByOrganisationName(networkName)

        if (!digidipOptional.isPresent) {
            return ScheduleAndTimestampOffset(
                FixedDelay.ofSeconds(60), pScheduleAndData.data
            )
        }

        val digidip = digidipOptional.get()

        val nowUnixTimestamp = Instant.now().epochSecond

        val scheduleAndData = if (pScheduleAndData.data == NO_INITIAL_DATA) {
            ScheduleAndTimestampOffset(
                pScheduleAndData.schedule, digidip.transactionImportStartAt!!.toEpochSecond()
            )
        } else pScheduleAndData

        val startModifiedTimestampSeconds = scheduleAndData.data + 1

        val endModifiedTimestampSeconds = min(
            (startModifiedTimestampSeconds + digidip.transactionImportIntervalLengthSeconds!!).toLong(),
            nowUnixTimestamp
        )

        val interVallString = "[$startModifiedTimestampSeconds - $endModifiedTimestampSeconds]";

        val defaultScheduleSeconds = digidip.transactionImportIntervalSeconds!!

        try {
            var url = ""

            do {

                // Send request to digidip
                val response = digidipApiClient.fetchTransactions(
                    digidip, url, startModifiedTimestampSeconds, endModifiedTimestampSeconds
                )

                val transactions = digidipParser.parseTransactionsFromJson(digidip, response, merchantRestRepository)

                // Save to db
                saveTransactions(transactions, interVallString)

                url = digidipParser.getNextUrl(response)
            } while (url.isNotEmpty())

            if (endModifiedTimestampSeconds < nowUnixTimestamp) {
                LOG.warn("\${interVallString}: Backfill detected. Rescheduling task immediately.")
                return ScheduleAndTimestampOffset(FixedDelay.ofSeconds(1), endModifiedTimestampSeconds)
            }

            return ScheduleAndTimestampOffset(
                FixedDelay.ofSeconds(defaultScheduleSeconds), endModifiedTimestampSeconds
            )
        } catch (e: HttpClientErrorException.TooManyRequests) {
            // Extract the "Retry-After" value from the response headers
            val retryAfterSeconds = e.responseHeaders?.getFirst("Retry-After")?.toLongOrNull() ?: defaultScheduleSeconds

            LOG.warn("\${interVallString}: Too many requests. Rescheduling task in $retryAfterSeconds seconds.")
            return ScheduleAndTimestampOffset(
                FixedDelay.ofSeconds(retryAfterSeconds.toInt()), scheduleAndData.data
            )
        } catch (e: Exception) {
            LOG.warn("\${interVallString}: Failed to fetch data: \${e.message}")
            return ScheduleAndTimestampOffset(
                FixedDelay.ofSeconds(defaultScheduleSeconds), scheduleAndData.data
            )
        }
    }

    fun saveTransactions(
        transactions: List<Transaction>,
        interVallString: String
    ) {
        transactionTemplate.execute {
            transactionRestRepository.saveAll(transactions)

            LOG.info("\${interVallString}: stored \${transactions.size} transactions")
        }
    }

}
`;

export default digidipTransactionTaskExecutorCode;
