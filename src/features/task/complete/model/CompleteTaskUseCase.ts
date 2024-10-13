import { TaskId, TasksList, TasksRepository } from "entities/task"

export class CompleteTaskUseCase {
  constructor(
    private readonly tasksList: TasksList,
    private readonly tasksRepository: TasksRepository
  ) {}

  public async complete(id: TaskId) {
    this.tasksList.complete(id)

    await this.tasksRepository.updateTasks(this.tasksList)
  }
}
