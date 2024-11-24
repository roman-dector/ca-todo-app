import { it, expect, vi } from "vitest"
import { renderHook } from "@testing-library/react"

import { AddTaskUseCase, TasksListBuilder } from "application/task"

import {
  TasksInMemoryDataSource,
  TasksRepositoryFacade,
} from "dal/task"

import { BusEvent, EventBus } from "shared/event-bus"

import {
  useAddTaskFormViewModel,
  type AddTaskFormViewModelDeps,
} from "./useAddTaskFormViewModel"

it("add task", async () => {
  // Arrange
  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepositoryFacade(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)
  const addTaskUseCase = new AddTaskUseCase(
    tasksListBuilder,
    tasksRepository
  )

  const EventBusMock = vi.fn<() => Partial<EventBus>>(() => ({
    publish: vi.fn(),
  }))
  const eventBus = new EventBusMock() as EventBus

  const deps: AddTaskFormViewModelDeps = {
    addTaskUseCase,
    eventBus,
  }

  const testingTask = { title: "title", description: "description" }

  const {
    result: { current: sut },
  } = renderHook(() => useAddTaskFormViewModel(deps))

  // Act
  await sut.addTask(testingTask)

  // Assert
  expect(eventBus.publish).toHaveBeenCalledWith(BusEvent.newTaskAdded)

  const tasksList = await tasksListBuilder.build()
  const tasksSplittedByStatus = tasksList.toSplittedByStatus()
  expect(tasksSplittedByStatus.active.length).equal(1)

  const taskFromList = tasksSplittedByStatus.active[0]!
  expect(taskFromList.title).equal(testingTask.title)
  expect(taskFromList.description).equal(testingTask.description)
  expect(taskFromList.status).equal("active")
})
