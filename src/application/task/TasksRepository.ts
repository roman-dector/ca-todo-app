import type { TasksList, TasksSplittedByStatus } from "domain/task"

export interface TasksRepository {
  fetchAll(): Promise<TasksSplittedByStatus>
  updateTasks(data: TasksList): Promise<void>
}
