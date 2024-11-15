import { TaskId } from "domain/task"
import {
  TasksListUiState,
  EmptyTasksListUiState,
  TasksListView,
  TasksLoadingUiState,
} from "./TasksListUiState"

export interface TasksListViewModel {
  uiState:
    | TasksListUiState
    | EmptyTasksListUiState
    | TasksLoadingUiState

  switchView: (view: TasksListView) => void

  completeTask: (id: TaskId) => void
  removeTask: (id: TaskId) => void
  removeAllCompleted: () => void
  reopenTask: (id: TaskId) => void
}
