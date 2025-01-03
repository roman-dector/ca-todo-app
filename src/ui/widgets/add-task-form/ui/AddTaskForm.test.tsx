import { it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { disabledSubmitUiState, readyToSubmitUiState } from "../model"

import { AddTaskFormView } from "./AddTaskForm"
import { NewTaskData } from "application/task"

it("renders with disabled submit button", async () => {
  // Arrange
  const handler = vi.fn()

  const uiState = disabledSubmitUiState()

  render(
    <AddTaskFormView
      uiState={uiState}
      changeTitle={handler}
      changeDescription={handler}
      addTask={handler}
    />
  )

  // Assert
  expect(screen.getAllByRole("button")[0]).toBeDisabled() // visible on desktop
  expect(screen.getAllByRole("button")[1]).toBeDisabled() // visible on mobile
})

it("renders with enabled submit button", async () => {
  // Arrange
  const _ = vi.fn()

  const uiState = readyToSubmitUiState()

  render(
    <AddTaskFormView
      uiState={uiState}
      changeTitle={_}
      changeDescription={_}
      addTask={_}
    />
  )

  const buttons = screen.getAllByRole("button")

  // Assert
  expect(buttons[0]).not.toBeDisabled() // visible on desktop
  expect(buttons[1]).not.toBeDisabled() // visible on mobile
})

it("trigger title change on input", async () => {
  // Arrange
  const _ = vi.fn()
  const changeTitle = vi.fn()

  const uiState = readyToSubmitUiState()

  const user = userEvent.setup()

  render(
    <AddTaskFormView
      uiState={uiState}
      changeTitle={changeTitle}
      changeDescription={_}
      addTask={_}
    />
  )

  const sut = screen.getByPlaceholderText("Task title")

  // Act
  await user.type(sut, "tst")

  // Assert
  expect(changeTitle).toHaveBeenNthCalledWith(1, "t")
  expect(changeTitle).toHaveBeenNthCalledWith(2, "s")
  expect(changeTitle).toHaveBeenNthCalledWith(3, "t")
})

it("trigger description change on input", async () => {
  // Arrange
  const _ = vi.fn()
  const changeDescription = vi.fn()

  const uiState = readyToSubmitUiState()

  const user = userEvent.setup()

  render(
    <AddTaskFormView
      uiState={uiState}
      changeTitle={_}
      changeDescription={changeDescription}
      addTask={_}
    />
  )

  const sut = screen.getByPlaceholderText("Task description")

  // Act
  await user.type(sut, "tst")

  // Assert
  expect(changeDescription).toHaveBeenNthCalledWith(1, "t")
  expect(changeDescription).toHaveBeenNthCalledWith(2, "s")
  expect(changeDescription).toHaveBeenNthCalledWith(3, "t")
})

it.each(["mobile", "desktop"])(
  "trigger task creating on %s submit",
  async display => {
    // Arrange
    const _ = vi.fn()
    const addTask = vi.fn()

    const newTaskData: NewTaskData = {
      title: "title",
      description: "description",
    }
    const uiState = readyToSubmitUiState(newTaskData)

    const user = userEvent.setup()

    screen

    render(
      <AddTaskFormView
        uiState={uiState}
        changeTitle={_}
        changeDescription={_}
        addTask={addTask}
      />
    )

    const sut = screen.getByText("Add", {
      selector: `.${display} button`,
    })

    // Act
    await user.click(sut)

    // Assert
    expect(addTask).toBeCalledWith(newTaskData)
  }
)
