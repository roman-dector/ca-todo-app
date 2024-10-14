import {
  TaskId,
  TasksListBuilder,
  TasksRepository,
} from "entities/task"

export class RemoveTaskUseCase {
  constructor(
    private readonly tasksListBuilder: TasksListBuilder,
    private readonly tasksRepository: TasksRepository
  ) {}

  public async remove(id: TaskId) {
    const tasksList = await this.tasksListBuilder.build()

    tasksList.remove(id)

    await this.tasksRepository.updateTasks(tasksList)
  }
}
