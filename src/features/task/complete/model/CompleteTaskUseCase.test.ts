import { it, expect } from "vitest"

import { CompleteTaskUseCase } from "./CompleteTaskUseCase"

import {
  TasksInMemoryDataSource,
  TasksList,
  TasksRepository,
  Task,
  genTaskId,
} from "entities/task"

it("completed task moves to completed array", async () => {
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
  const sut = new CompleteTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.complete(task.id)

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

  const tasksList = new TasksList({
    active: [[task.id, task]],
    completed: [],
  })

  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepository(tasksDataSource)
  const sut = new CompleteTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.complete(task.id)
  sut.complete(task.id)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(0)
  expect(tasks.completed).toHaveLength(1)
  expect(tasks.completed[0]?.[1].id).equal(task.id)
})
