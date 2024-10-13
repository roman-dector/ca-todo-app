import { it, expect } from "vitest"

import { AddTaskUseCase, NewTaskData } from "./AddTaskUseCase"
import {
  TasksInMemoryDataSource,
  TasksList,
  TasksRepository,
} from "entities/task"

it("task with filled title and description is added", async () => {
  // Arrange
  const data: NewTaskData = {
    title: "title",
    description: "description",
  }

  const tasksList = new TasksList({ active: [], completed: [] })
  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepository(tasksDataSource)
  const sut = new AddTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.add(data)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(1)
})

it("newly added task has active status", async () => {
  // Arrange
  const data: NewTaskData = {
    title: "title",
    description: "description",
  }

  const tasksList = new TasksList({ active: [], completed: [] })
  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepository(tasksDataSource)
  const sut = new AddTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.add(data)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active[0]?.[1].status).toBe("active")
})

it("task with empty title is not added", async () => {
  // Arrange
  const data: NewTaskData = {
    title: "",
    description: "description",
  }

  const tasksList = new TasksList({ active: [], completed: [] })
  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepository(tasksDataSource)
  const sut = new AddTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.add(data)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(0)
})

it("task with empty description is not added", async () => {
  // Arrange
  const data: NewTaskData = {
    title: "title",
    description: "",
  }

  const tasksList = new TasksList({ active: [], completed: [] })
  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepository(tasksDataSource)
  const sut = new AddTaskUseCase(tasksList, tasksRepository)

  // Act
  sut.add(data)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(0)
})
