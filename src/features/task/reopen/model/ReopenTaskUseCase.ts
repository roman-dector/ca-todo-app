import { TaskId, TasksList, TasksRepository } from "entities/task"

export class ReopenTaskUseCase {
  constructor(
    private readonly tasksList: TasksList,
    private readonly tasksRepository: TasksRepository
  ) {}

  public async reopen(id: TaskId) {
    this.tasksList.reopen(id)

    await this.tasksRepository.updateTasks(this.tasksList)
  }
}
