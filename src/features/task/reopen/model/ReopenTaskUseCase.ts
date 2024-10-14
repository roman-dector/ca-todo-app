import {
  TaskId,
  TasksListBuilder,
  TasksRepository,
} from "entities/task"

export class ReopenTaskUseCase {
  constructor(
    private readonly tasksListBuilder: TasksListBuilder,
    private readonly tasksRepository: TasksRepository
  ) {}

  public async reopen(id: TaskId) {
    const tasksList = await this.tasksListBuilder.build()

    tasksList.reopen(id)

    await this.tasksRepository.updateTasks(tasksList)
  }
}
