import { it, expect } from "vitest"

import { ReopenTaskUseCase } from "./ReopenTaskUseCase"

import {
  TasksInMemoryDataSource,
  TasksList,
  TasksRepository,
  Task,
  genTaskId,
} from "entities/task"

it("reopen task moves to active array", async () => {
  // Arrange
  const task: Task = {
    id: genTaskId(),
    title: "title",
    description: "description",
    status: "active",
  }

  const tasksList = new TasksList({
    active: [],
    completed: [[task.id, task]],
  })

  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepository(tasksDataSource)
  const sut = new ReopenTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.reopen(task.id)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(1)
})

it("tasks reopens only ones", async () => {
  // Arrange
  const task: Task = {
    id: genTaskId(),
    title: "title",
    description: "description",
    status: "active",
  }

  const tasksList = new TasksList({
    active: [],
    completed: [[task.id, task]],
  })

  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepository(tasksDataSource)
  const sut = new ReopenTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.reopen(task.id)
  sut.reopen(task.id)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(1)
})
