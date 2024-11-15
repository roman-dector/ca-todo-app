import { TasksListBuilder } from "./TasksListBuilder"

import { type TaskId } from "domain/task"
import { type TasksRepository } from "./TasksRepository"

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
