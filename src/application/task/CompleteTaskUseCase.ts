import { TaskId } from "domain/task"

import { TasksListBuilder } from "./TasksListBuilder"

import { type TasksRepository } from "./TasksRepository"

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
