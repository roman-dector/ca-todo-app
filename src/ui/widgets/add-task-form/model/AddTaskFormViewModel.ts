import { NewTaskData } from "application/task"

import type { AddTaskFormUiState } from "./AddTaskFormUiState"

export interface AddTaskFormViewModel {
  uiState: AddTaskFormUiState

  changeTitle(title: string): Promise<void>
  changeDescription(description: string): Promise<void>

  addTask(task: NewTaskData): Promise<void>
}
