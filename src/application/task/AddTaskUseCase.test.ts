import { it, expect } from "vitest"

import { AddTaskUseCase, NewTaskData } from "./AddTaskUseCase"

import {
  TasksInMemoryDataSource,
  TasksRepositoryFacade,
} from "dal/task"

import { TasksListBuilder } from "./TasksListBuilder"

it("task with filled title and description is added", async () => {
  // Arrange
  const data: NewTaskData = {
    title: "title",
    description: "description",
  }

  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepositoryFacade(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)
  const sut = new AddTaskUseCase(tasksListBuilder, tasksRepository)

  // Act
  await sut.add(data)

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

  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepositoryFacade(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)
  const sut = new AddTaskUseCase(tasksListBuilder, tasksRepository)

  // Act
  await sut.add(data)

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

  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepositoryFacade(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)
  const sut = new AddTaskUseCase(tasksListBuilder, tasksRepository)

  // Act
  await sut.add(data)

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

  const tasksDataSource = new TasksInMemoryDataSource()
  const tasksRepository = new TasksRepositoryFacade(tasksDataSource)
  const tasksListBuilder = new TasksListBuilder(tasksRepository)
  const sut = new AddTaskUseCase(tasksListBuilder, tasksRepository)

  // Act
  await sut.add(data)

  // Assert
  const tasks = await tasksRepository.fetchAll()
  expect(tasks.active).toHaveLength(0)
})
