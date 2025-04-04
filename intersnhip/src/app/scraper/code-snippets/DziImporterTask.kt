@Component
class DziImporterTask(
    private val dziImporterTaskExecutor: DziImporterTaskExecutor
) {
    companion object {
        private val DZI_IMPORTER_TASK = TaskDescriptor.of("dzi-importer-task", ScheduleAndPageCounter::class.java)
    }

    /**
     * Called automatically when the Spring application context is fully initialized.
     * Schedules the recurring task if it hasn't been scheduled yet.
     */
    @EventListener
    fun setupRecurringTasks(event: ContextRefreshedEvent) {
        val schedulerClient = event.applicationContext.getBean(SchedulerClient::class.java)
        schedulerClient.scheduleIfNotExists(
            DZI_IMPORTER_TASK.instance("default").data(
                ScheduleAndPageCounter(Schedules.fixedDelay(Duration.ofSeconds(0)), 1)
            ).scheduledAccordingToData()
        )
    }

    /**
     * Defines the actual recurring task and delegates its execution to the executor.
     */
    @Bean("dziImporterTaskBean")
    fun dziImporterTask(): RecurringTaskWithPersistentSchedule<ScheduleAndPageCounter> =
        Tasks.recurringWithPersistentSchedule(DZI_IMPORTER_TASK).executeStateful { taskInstance, _ ->
            dziImporterTaskExecutor.execute(taskInstance.data)
        }
}



