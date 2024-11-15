import type { Task } from "domain/task"

import type { TasksDataSource } from "./TasksDataSource"

export class TasksInMemoryDataSource implements TasksDataSource {
  private tasks: Task[] = []

  async fetchAll(): Promise<Task[]> {
    return this.tasks
  }

  async update(tasks: Task[]): Promise<void> {
    this.tasks = tasks
  }
}
