import { it, expect } from "vitest"

import { tasksListPresentation } from "./TasksListPresentation"
import {
  EmptyTasksListUiState,
  TasksListUiState,
  TasksListView,
} from "./TasksListUiState"
import { TasksSplittedByStatus, testTask } from "entities/task"

it.each<TasksListView>(["all", "active", "completed"])(
  "showing empty list state when no %s tasks",
  view => {
    // Arrange
    const appState: TasksSplittedByStatus = {
      active: [],
      completed: [],
    }

    // Act
    const uiState = tasksListPresentation(appState, view)

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

    const uiState = tasksListPresentation(appState, view)

    expect(uiState).instanceOf(TasksListUiState)
  }
)
