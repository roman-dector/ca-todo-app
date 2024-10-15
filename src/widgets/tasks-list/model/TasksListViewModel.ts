import { TaskId } from "entities/task"
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
  reopenTask: (id: TaskId) => void
}
