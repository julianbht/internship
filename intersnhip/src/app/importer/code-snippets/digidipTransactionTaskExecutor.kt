/**
 * Orchestrates the transaction import process from the Digidip API.
 *
 * The process consists of:
 *  - Retrieving network configuration using the network repository.
 *  - Determining the appropriate time range for transaction import.
 *  - Fetching, parsing, and persisting transactions.
 *  - Handling pagination and rate limiting.
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

    /**
     * Executes the recurring import task.
     *
     * It first determines the correct time range for fetching transactions.
     * Then it iteratively fetches and processes paginated results.
     * If the task is processing historical data, it may reschedule immediately.
     * In case of rate limiting, it uses the 'Retry-After' header from the API response.
     */
    internal fun executeTask(pScheduleAndData: ScheduleAndTimestampOffset, networkName: String): ScheduleAndTimestampOffset {

        val digidipOptional: Optional<Network> = networkRestRepository.findByOrganisationName(networkName)

        // If no configuration is found, schedule the next attempt after a 60-second delay.
        if (!digidipOptional.isPresent) {
            return ScheduleAndTimestampOffset(
                FixedDelay.ofSeconds(60), pScheduleAndData.data
            )
        }

        val digidip = digidipOptional.get()

        val nowUnixTimestamp = Instant.now().epochSecond

        // On first run, initialize the import start time based on the network's settings.
        val scheduleAndData = if (pScheduleAndData.data == NO_INITIAL_DATA) {
            ScheduleAndTimestampOffset(
                pScheduleAndData.schedule, digidip.transactionImportStartAt!!.toEpochSecond()
            )
        } else pScheduleAndData

        val startModifiedTimestampSeconds = scheduleAndData.data + 1

        // Calculate the end of the query range: either the maximum interval or current time.
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

            // If the fetched end time is still in the past, immediately reschedule for backfill.
            if (endModifiedTimestampSeconds < nowUnixTimestamp) {
                LOG.warn("$interVallString: Backfill detected. Rescheduling task immediately.")
                return ScheduleAndTimestampOffset(FixedDelay.ofSeconds(1), endModifiedTimestampSeconds)
            }

            // Otherwise, schedule the next run using the default delay.
            return ScheduleAndTimestampOffset(
                FixedDelay.ofSeconds(defaultScheduleSeconds), endModifiedTimestampSeconds
            )
        } catch (e: HttpClientErrorException.TooManyRequests) {
            // Extract the "Retry-After" value from the response headers
            val retryAfterSeconds = e.responseHeaders?.getFirst("Retry-After")?.toLongOrNull() ?: defaultScheduleSeconds

            LOG.warn("$interVallString: Too many requests. Rescheduling task in $retryAfterSeconds seconds.")
            return ScheduleAndTimestampOffset(
                FixedDelay.ofSeconds(retryAfterSeconds.toInt()), scheduleAndData.data
            )
        } catch (e: Exception) {
            LOG.warn("$interVallString: Failed to fetch data: ${e.message}")
            return ScheduleAndTimestampOffset(
                FixedDelay.ofSeconds(defaultScheduleSeconds), scheduleAndData.data
            )
        }
    }


    /**
     * Persists a list of transactions within a transactional block.
     *
     * This method ensures that all transaction records are saved atomically.
     * If any error occurs, the entire transaction is rolled back.
     *
     * */
    fun saveTransactions(
        transactions: List<Transaction>,
        interVallString: String
    ) {
        transactionTemplate.execute {
            transactionRestRepository.saveAll(transactions)

            LOG.info("$interVallString: stored ${transactions.size} transactions")
        }
    }

}
