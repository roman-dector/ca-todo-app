import { TaskId } from "entities/task"
import {
  TasksListUiState,
  EmptyTasksListUiState,
} from "./TasksListUiState"

export interface TasksListViewModel {
  uiState: TasksListUiState | EmptyTasksListUiState

  completeTask: (id: TaskId) => void
  removeTask: (id: TaskId) => void
  reopenTask: (id: TaskId) => void
}