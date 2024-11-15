import { it, expect } from "vitest"

import { tasksListPresentation } from "./TasksListPresentation"
import {
  EmptyTasksListUiState,
  TasksListUiState,
  TasksListView,
  TasksLoadingUiState,
} from "./TasksListUiState"
import {
  tasksSplittedByStatus,
  TasksSplittedByStatus,
  testTask,
} from "domain/task"

it.each<TasksListView>(["all", "active", "completed"])(
  "showing empty list state when no %s tasks",
  view => {
    // Arrange
    const appState: TasksSplittedByStatus = {
      active: [],
      completed: [],
    }

    // Act
    const uiState = tasksListPresentation(appState, view, "idle")

    // Assert
    expect(uiState).instanceOf(EmptyTasksListUiState)

    const msg = (uiState as EmptyTasksListUiState).message

    expect(msg).toBeTypeOf("string")
    expect(msg.length).greaterThan(0)
  }
)

it.each<TasksListView>(["all", "active", "completed"])(
  "showing existing %s tasks",
  view => {
    const task = testTask()
    const appState: TasksSplittedByStatus = {
      active: [[task.id, task]],
      completed: [[task.id, task]],
    }

    const uiState = tasksListPresentation(appState, view, "idle")

    expect(uiState).instanceOf(TasksListUiState)
  }
)

it("showing loader on initial render", () => {
  const appState = tasksSplittedByStatus()

  const uiState = tasksListPresentation(appState, "all", "initial")

  expect(uiState).instanceOf(TasksLoadingUiState)
})

it("showing loader when tasks loading", () => {
  const appState = tasksSplittedByStatus()

  const uiState = tasksListPresentation(appState, "all", "loading")

  expect(uiState).instanceOf(TasksLoadingUiState)
})
