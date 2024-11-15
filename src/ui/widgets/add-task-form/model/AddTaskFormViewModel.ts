import { NewTaskData } from "application/task"
import {
  AddTaskFormUiState,
  DisabledSubmitUiState,
} from "./AddTaskFormUiState"

export interface AddTaskFormViewModel {
  uiState: AddTaskFormUiState | DisabledSubmitUiState

  changeTitle(title: string): void
  changeDescription(description: string): void

  addTask(task: NewTaskData): void
}
