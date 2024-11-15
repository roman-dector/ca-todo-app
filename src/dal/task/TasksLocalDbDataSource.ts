import localForage from "localforage"

import type { Task } from "domain/task"

import type { TasksDataSource } from "./TasksDataSource"

const LOCAL_TASKS_KEY = "tasks"

export class TasksLocalDbDataSource implements TasksDataSource {
  constructor(private readonly localTasksKey = LOCAL_TASKS_KEY) {}

  async fetchAll(): Promise<Task[]> {
    return (
      (await localForage.getItem<Task[]>(this.localTasksKey)) || []
    )
  }

  async update(tasks: Task[]): Promise<void> {
    await localForage.setItem(this.localTasksKey, tasks)
  }
}
