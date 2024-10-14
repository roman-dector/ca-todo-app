import { it, expect } from "vitest"

import { tasksListPresentation } from "./TasksListPresentation"
import {
  EmptyTasksListUiState,
  TasksListUiState,
} from "./TasksListUiState"
import { TasksSplittedByStatus, testTask } from "entities/task"

it("showing empty list state when no tasks", () => {
  const appState: TasksSplittedByStatus = {
    active: [],
    completed: [],
  }

  const uiState = tasksListPresentation(appState)

  expect(uiState).instanceOf(EmptyTasksListUiState)
})

it("showing existing tasks", () => {
  const task = testTask()
  const appState: TasksSplittedByStatus = {
    active: [[task.id, task]],
    completed: [],
  }

  const uiState = tasksListPresentation(appState)

  expect(uiState).instanceOf(TasksListUiState)
})
