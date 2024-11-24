import { NewTaskData } from "application/task"

import { AddTaskFormUiState } from "./AddTaskFormUiState"

import type { AddTaskFormViewModel } from "./AddTaskFormViewModel"

export const addTaskFormPresentation = (
  data: NewTaskData
): AddTaskFormViewModel["uiState"] => {
  if (!(data.title && data.description)) {
    return new AddTaskFormUiState.DisabledSubmit(data)
  }

  return new AddTaskFormUiState.ReadyToSubmit(data)
}
