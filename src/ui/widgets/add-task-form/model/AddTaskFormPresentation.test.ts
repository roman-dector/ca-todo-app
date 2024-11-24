import { it, expect } from "vitest"

import { addTaskFormPresentation } from "./AddTaskFormPresentation"
import { AddTaskFormUiState } from "./AddTaskFormUiState"
import { NewTaskData } from "application/task"

it("ready to submit when all fields are filled", () => {
  const userInput: NewTaskData = {
    title: "title",
    description: "description",
  }

  const uiState = addTaskFormPresentation(userInput)

  expect(uiState).instanceOf(AddTaskFormUiState.ReadyToSubmit)
})

it("submit disabled when title is empty", () => {
  const userInput: NewTaskData = {
    title: "",
    description: "description",
  }

  const uiState = addTaskFormPresentation(userInput)

  expect(uiState).instanceOf(AddTaskFormUiState.DisabledSubmit)
})

it("submit disabled when description is empty", () => {
  const userInput: NewTaskData = {
    title: "title",
    description: "",
  }

  const uiState = addTaskFormPresentation(userInput)

  expect(uiState).instanceOf(AddTaskFormUiState.DisabledSubmit)
})
