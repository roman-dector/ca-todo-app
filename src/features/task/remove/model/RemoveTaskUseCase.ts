import { TaskId, TasksList, TasksRepository } from "entities/task"

export class RemoveTaskUseCase {
  constructor(
    private readonly tasksList: TasksList,
    private readonly tasksRepository: TasksRepository
  ) {}

  public async remove(id: TaskId) {
    this.tasksList.remove(id)

    await this.tasksRepository.updateTasks(this.tasksList)
  }
}
