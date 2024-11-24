import type {
  TasksList,
  TasksEntrySplittedByStatus,
} from "domain/task"

export interface TasksRepository {
  fetchAll(): Promise<TasksEntrySplittedByStatus>
  updateTasks(data: TasksList): Promise<void>
}
