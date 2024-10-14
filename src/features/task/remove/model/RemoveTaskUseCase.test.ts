import { it, expect } from "vitest"

import { RemoveTaskUseCase } from "./RemoveTaskUseCase"

import {
  TasksInMemoryDataSource,
  TasksRepository,
  Task,
  genTaskId,
  TasksListBuilder,
} from "entities/task"

it("task removes from active state", async () => {
  // Arrange
  const task: Task = {
    id: genTaskId(),
    title: "title",
    description: "description",
    status: "active",
  }

  const tasksDataSource = new TasksInMemoryDataSource()
  await tasksDataSource.update([task])

  const tasksRepository = new TasksRepository(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)

  const sut = new RemoveTaskUseCase(tasksListBuilder, tasksRepository)

  // Act
  await sut.remove(task.id)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(0)
})

it("task removes from completed state", async () => {
  // Arrange
  const task: Task = {
    id: genTaskId(),
    title: "title",
    description: "description",
    status: "completed",
  }

  const tasksDataSource = new TasksInMemoryDataSource()
  await tasksDataSource.update([task])

  const tasksRepository = new TasksRepository(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)

  const sut = new RemoveTaskUseCase(tasksListBuilder, tasksRepository)

  // Act
  await sut.remove(task.id)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.completed).toHaveLength(0)
})
