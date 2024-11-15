import type {
  TasksSplittedByStatus,
  Task,
  TaskEntry,
} from "domain/task"
import {
  EmptyTasksListUiState,
  TasksListUiState,
  TaskUiState,
  TasksLoadingUiState,
  type TasksListStatus,
  type TasksCount,
  type TasksListView,
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
  view: TasksListView,
  status: TasksListStatus
): TasksListViewModel["uiState"] => {
  if (status === "initial" || status === "loading") {
    return new TasksLoadingUiState()
  }

  const { active, completed } = appState

  let tasks: TaskEntry[]

  const tasksCount: TasksCount = {
    all: active.length + completed.length,
    active: active.length,
    completed: completed.length,
  }

  switch (view) {
    case "all": {
      tasks = active.concat(completed)

      if (tasks.length === 0) {
        return new EmptyTasksListUiState({
          message: "Nothing to do",
          view,
          tasksCount,
        })
      }

      break
    }
    case "active": {
      tasks = active

      if (tasks.length === 0) {
        return new EmptyTasksListUiState({
          message: "No active tasks",
          view,
          tasksCount,
        })
      }
      break
    }
    case "completed": {
      tasks = completed

      if (tasks.length === 0) {
        return new EmptyTasksListUiState({
          message: "No completed tasks",
          view,
          tasksCount,
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

  return new TasksListUiState({
    tasks: tasksUiState,
    view,
    tasksCount,
  })
}
