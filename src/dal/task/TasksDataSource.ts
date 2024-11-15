import type { Task } from "domain/task"

export interface TasksDataSource {
  fetchAll(): Promise<Task[]>
  update(tasks: Task[]): Promise<void>
}
