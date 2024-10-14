import type { TasksSplittedByStatus, Task } from "entities/task"
import {
  EmptyTasksListUiState,
  TasksListUiState,
  TaskUiState,
} from "./TasksListUiState"
import { TasksListViewModel } from "./TasksListViewModel"

const taskPresentation = ({
  title,
  description,
  status,
}: Task): TaskUiState =>
  new TaskUiState({
    title,
    description,
    isCompleted: status === "completed",
  })

export const tasksListPresentation = (
  appState: TasksSplittedByStatus
): TasksListViewModel["uiState"] => {
  const { active, completed } = appState

  if (active.length === 0 && completed.length === 0) {
    return new EmptyTasksListUiState()
  }

  const tasks = active
    .concat(completed)
    .map(([_, task]) => taskPresentation(task))

  return new TasksListUiState({ tasks })
}
