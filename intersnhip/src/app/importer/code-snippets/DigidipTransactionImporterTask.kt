/**
 * Task class responsible for scheduling and executing the recurring job that imports
 * transaction data from the Digidip API. This class delegates the actual processing to the
 * DigidipTransactionTaskExecutor, which handles the import logic using the persisted task data.
 */

@Component
class DigidipTransactionImporterTask(
    private val dtte: DigidipTransactionTaskExecutor,
) {

    companion object {
        private val DIGIDIP_TRANSACTION_IMPORTER_TASK = TaskDescriptor.of(
            "digidip-transaction-importer-task",
            ScheduleAndTimestampOffset::class.java,
        )
    }

    /**
     * Ensures that the recurring task for importing transactions is scheduled.
     * This method is triggered when the application context is refreshed. If the task does not exist,
     * it is scheduled with initial data, including a starting schedule and a flag indicating no prior data.
     */
    @EventListener
    fun setupRecurringTasks(event: ContextRefreshedEvent) {
        val schedulerClient = event.applicationContext.getBean(SchedulerClient::class.java)

        val immediately = Schedules.fixedDelay(Duration.ofSeconds(0))

        schedulerClient.scheduleIfNotExists(
            DIGIDIP_TRANSACTION_IMPORTER_TASK.instance("default").data(
                ScheduleAndTimestampOffset(
                    immediately, NO_INITIAL_DATA
                )
            ).scheduledAccordingToData()
        )
    }

    /**
     * Defines a recurring task that triggers the import of transactions from the Digidip API.
     *
     * This task is configured with a persistent schedule, meaning its execution state (including
     * any scheduling metadata) is stored in the database. Each time the task is executed, it delegates
     * the import logic to the DigidipTransactionTaskExecutor using the task's persisted data.
     *
     * @return A RecurringTaskWithPersistentSchedule object that manages the execution of the import job.
     */
    @Bean("digidipTransactionImporterTaskBean")
    fun digidipTransactionImporterTask(): RecurringTaskWithPersistentSchedule<ScheduleAndTimestampOffset>? {
        return Tasks.recurringWithPersistentSchedule(
            DIGIDIP_TRANSACTION_IMPORTER_TASK
        ).executeStateful { taskInstance, _ ->
            dtte.executeTask(taskInstance.data, DIGIDIP_NETWORK_NAME)
        }
    }


}
