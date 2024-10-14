import { NewTaskData } from "features/task"
import {
  AddTaskFormUiState,
  DisabledSubmitUiState,
} from "./AddTaskFormUiState"

export interface AddTaskFormViewModel {
  uiState: AddTaskFormUiState | DisabledSubmitUiState

  addTask(task: NewTaskData): void
}
