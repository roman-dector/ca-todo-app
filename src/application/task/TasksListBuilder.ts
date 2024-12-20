import { TasksList } from "domain/task"

import { type TasksRepository } from "./TasksRepository"

export class TasksListBuilder {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async build(): Promise<TasksList> {
    const tasks = await this.tasksRepository.fetchAll()

    return new TasksList(tasks)
  }
}
