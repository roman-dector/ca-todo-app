import { it, expect } from "vitest"

import { genTaskId, type Task } from "domain/task"

import {
  TasksInMemoryDataSource,
  TasksRepositoryFacade,
} from "dal/task"

import { ReopenTaskUseCase } from "./ReopenTaskUseCase"
import { TasksListBuilder } from "./TasksListBuilder"

it("reopen task moves to active array", async () => {
  // Arrange
  const task: Task = {
    id: genTaskId(),
    title: "title",
    description: "description",
    status: "completed",
  }

  const tasksDataSource = new TasksInMemoryDataSource()
  await tasksDataSource.update([task])

  const tasksRepository = new TasksRepositoryFacade(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)

  const sut = new ReopenTaskUseCase(tasksListBuilder, tasksRepository)

  // Act
  await sut.reopen(task.id)

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
    status: "completed",
  }

  const tasksDataSource = new TasksInMemoryDataSource()
  await tasksDataSource.update([task])

  const tasksRepository = new TasksRepositoryFacade(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)

  const sut = new ReopenTaskUseCase(tasksListBuilder, tasksRepository)

  // Act
  await sut.reopen(task.id)
  await sut.reopen(task.id)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(1)
})
