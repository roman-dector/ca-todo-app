import type {
  TasksSplittedByStatus,
  Task,
  TaskEntry,
} from "entities/task"
import {
  EmptyTasksListUiState,
  TasksListUiState,
  TasksListView,
  TaskUiState,
} from "./TasksListUiState"
import { TasksListViewModel } from "./TasksListViewModel"

const taskPresentation = ({
  id,
  title,
  description,
  status,
}: Task): TaskUiState =>
  new TaskUiState({
    id,
    title,
    description,
    isCompleted: status === "completed",
  })

export const tasksListPresentation = (
  appState: TasksSplittedByStatus,
  view: TasksListView
): TasksListViewModel["uiState"] => {
  const { active, completed } = appState

  let tasks: TaskEntry[]

  switch (view) {
    case "all": {
      tasks = active.concat(completed)

      if (tasks.length === 0) {
        return new EmptyTasksListUiState()
      }

      break
    }
    case "active": {
      tasks = active

      if (tasks.length === 0) {
        return new EmptyTasksListUiState({
          message: "No active tasks",
        })
      }
      break
    }
    case "completed": {
      tasks = completed

      if (tasks.length === 0) {
        return new EmptyTasksListUiState({
          message: "No completed tasks",
        })
      }

      break
    }
    default: {
      const _exhaustiveCheck: never = view
      return _exhaustiveCheck
    }
  }

  const tasksUiState = tasks.map(([_, task]) =>
    taskPresentation(task)
  )

  return new TasksListUiState({ tasks: tasksUiState, view })
}
