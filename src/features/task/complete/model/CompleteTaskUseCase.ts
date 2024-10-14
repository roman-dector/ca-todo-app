import {
  TaskId,
  TasksListBuilder,
  TasksRepository,
} from "entities/task"

export class CompleteTaskUseCase {
  constructor(
    private readonly tasksListBuilder: TasksListBuilder,
    private readonly tasksRepository: TasksRepository
  ) {}

  public async complete(id: TaskId) {
    const tasksList = await this.tasksListBuilder.build()

    tasksList.complete(id)

    await this.tasksRepository.updateTasks(tasksList)
  }
}
