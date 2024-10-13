import { it, expect } from "vitest"

import { RemoveTaskUseCase } from "./RemoveTaskUseCase"

import {
  TasksInMemoryDataSource,
  TasksList,
  TasksRepository,
  Task,
  genTaskId,
} from "entities/task"

it("task removes from active state", async () => {
  // Arrange
  const task: Task = {
    id: genTaskId(),
    title: "title",
    description: "description",
    status: "active",
  }

  const tasksList = new TasksList({
    active: [[task.id, task]],
    completed: [],
  })

  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepository(tasksDataSource)
  const sut = new RemoveTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.remove(task.id)

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
    status: "active",
  }

  const tasksList = new TasksList({
    active: [],
    completed: [[task.id, task]],
  })

  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepository(tasksDataSource)
  const sut = new RemoveTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.remove(task.id)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.completed).toHaveLength(0)
})
