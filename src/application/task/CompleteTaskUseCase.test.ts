import { it, expect } from "vitest"

import { genTaskId, type Task } from "domain/task"

import {
  TasksInMemoryDataSource,
  TasksRepositoryImpl,
} from "dal/task"

import { CompleteTaskUseCase } from "./CompleteTaskUseCase"
import { TasksListBuilder } from "./TasksListBuilder"

it("completed task moves to completed array", async () => {
  // Arrange
  const task: Task = {
    id: genTaskId(),
    title: "title",
    description: "description",
    status: "active",
  }

  const tasksDataSource = new TasksInMemoryDataSource()
  await tasksDataSource.update([task])

  const tasksRepository = new TasksRepositoryImpl(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)

  const sut = new CompleteTaskUseCase(
    tasksListBuilder,
    tasksRepository
  )

  // Act
  await sut.complete(task.id)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(0)
  expect(tasks.completed).toHaveLength(1)
  expect(tasks.completed[0]?.[1].id).equal(task.id)
})

it("task completes only ones", async () => {
  // Arrange
  const task: Task = {
    id: genTaskId(),
    title: "title",
    description: "description",
    status: "active",
  }

  const tasksDataSource = new TasksInMemoryDataSource()
  await tasksDataSource.update([task])

  const tasksRepository = new TasksRepositoryImpl(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)

  const sut = new CompleteTaskUseCase(
    tasksListBuilder,
    tasksRepository
  )

  // Act
  await sut.complete(task.id)
  await sut.complete(task.id)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(0)
  expect(tasks.completed).toHaveLength(1)
  expect(tasks.completed[0]?.[1].id).equal(task.id)
})
