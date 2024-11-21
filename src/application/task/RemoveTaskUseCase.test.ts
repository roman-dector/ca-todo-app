import { it, expect } from "vitest"

import { testTask, type TaskStatus } from "domain/task"

import {
  TasksInMemoryDataSource,
  TasksRepositoryFacade,
} from "dal/task"

import { TasksListBuilder } from "./TasksListBuilder"
import { RemoveTaskUseCase } from "./RemoveTaskUseCase"

it.each<TaskStatus>(["active", "completed"])(
  "task removes from %s state",
  async status => {
    // Arrange
    const task = testTask({ status })

    const tasksDataSource = new TasksInMemoryDataSource()
    await tasksDataSource.update([task])

    const tasksRepository = new TasksRepositoryFacade(tasksDataSource)
    const tasksListBuilder = new TasksListBuilder(tasksRepository)

    const sut = new RemoveTaskUseCase(
      tasksListBuilder,
      tasksRepository
    )

    // Act
    await sut.remove(task.id)

    // Assert
    const tasks = await tasksRepository.fetchAll()
    expect(tasks[status]).toHaveLength(0)
  }
)

it.each<TaskStatus>(["active", "completed"])(
  "removes multiple %s tasks in one transaction",
  async status => {
    // Arrange
    const testTasks = Array(5)
      .fill(null)
      .map(() => testTask({ status }))

    const tasksDataSource = new TasksInMemoryDataSource()
    await tasksDataSource.update(testTasks)

    const tasksRepository = new TasksRepositoryFacade(tasksDataSource)
    const tasksListBuilder = new TasksListBuilder(tasksRepository)

    const sut = new RemoveTaskUseCase(
      tasksListBuilder,
      tasksRepository
    )

    // Act
    await sut.remove(testTasks.map(({ id }) => id))

    // Assert
    const tasks = await tasksRepository.fetchAll()
    expect(tasks[status]).toHaveLength(0)
  }
)
