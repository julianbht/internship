/**
 * HandleWs the execution logic for importing and storing charities from the DZI website.
 * This includes scraping, parsing, and saving both Charity and Project entities.
 */
@Service
class DziImporterTaskExecutor(
    private val charityRestRepository: CharityRestRepository,
    private val projectRestRepository: ProjectRestRepository,
    private val dziScraper: DziScraper,
    private val htmlParser: DziHtmlParser,
    private val transactionTemplate: TransactionTemplate
) {
    companion object {
        private val LOG = LoggerFactory.getLogger(DziImporterTaskExecutor::class.java)
        private const val MAX_ENTRIES = 1500
        private const val TIME_BETWEEN_RUNS_SECONDS = 60 * 60 * 24
        private const val TIME_BETWEEN_RUNS_ERROR = 60 * 60 * 24
        const val BASE_URL = "https://www.dzi.de/organisation"
    }

    /**
     * Main task execution method, triggered by the scheduler.
     * Scrapes and processes organization pages until the limit is reached or no more pages exist.
     */
    fun execute(scheduleAndData: ScheduleAndPageCounter): ScheduleAndPageCounter {
        try {
            var currentPage: String? = BASE_URL
            var totalProcessed = 0

            while (currentPage != null && totalProcessed < MAX_ENTRIES) {
                LOG.info("Scraping list page: $currentPage")
                val entryUrls = htmlParser.fetchEntryUrls(currentPage)

                for (orgUrl in entryUrls) {
                    if (totalProcessed >= MAX_ENTRIES) break
                    Thread.sleep(1000)

                    val charity = dziScraper.getCharity(orgUrl)
                    LOG.info(charity.toString())

                    if (charity != null) {
                        saveCharity(charity)
                    }

                    totalProcessed++
                }

                currentPage = htmlParser.getNextPageUrl(currentPage, totalProcessed, MAX_ENTRIES)
            }

            LOG.info("Scraping stopped after processing $totalProcessed entries.")
            return ScheduleAndPageCounter(
                FixedDelay.ofSeconds(TIME_BETWEEN_RUNS_SECONDS),
                scheduleAndData.data
            )
        } catch (e: Exception) {
            LOG.warn("### Failed to fetch data: ${e.message}")
            return ScheduleAndPageCounter(
                FixedDelay.ofSeconds(TIME_BETWEEN_RUNS_ERROR),
                scheduleAndData.data
            )
        }
    }

    /**
     * Saves the Charity and corresponding Project in a single transactional block.
     * Ensures atomicity: either both entities are saved or none.
     */
    fun saveCharity(charityToSave: Charity) {
        transactionTemplate.execute {
            charityRestRepository.save(charityToSave)
            projectRestRepository.save(buildProjectFromCharity(charityToSave))
            LOG.info("Saved ${charityToSave.organisation.displayName} in one transaction")
        }
    }

    /**
     * Creates a Project entity based on Charity data.
     * This is needed because projects mirror some aspects of their associated charities.
     */
    private fun buildProjectFromCharity(charity: Charity): Project {
        return Project(
            charity = charity,
            fieldsOfWork = charity.fieldsOfWork,
            focusedCountryCodes = charity.focusedCountryCodes,
            id = combineToUUID(charity.id.toString()),
            name = charity.organisation.name.toString(),
            description = charity.organisation.description,
            socialMedia = charity.organisation.socialMedia,
            startDate = null,
            endDate = null
        )
    }
}
