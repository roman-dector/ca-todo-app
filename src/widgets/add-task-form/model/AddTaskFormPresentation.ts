import { NewTaskData } from "features/task"
import { AddTaskFormViewModel } from "./AddTaskFormViewModel"
import {
  AddTaskFormUiState,
  DisabledSubmitUiState,
} from "./AddTaskFormUiState"

export const addTaskFormPresentation = (
  data: NewTaskData
): AddTaskFormViewModel["uiState"] => {
  if (!(data.title && data.description)) {
    return new DisabledSubmitUiState(data)
  }

  return new AddTaskFormUiState(data)
}
