import { it, expect } from "vitest"

import { RemoveTaskUseCase } from "./RemoveTaskUseCase"

import {
  TasksInMemoryDataSource,
  TasksRepository,
  TasksListBuilder,
  testTask,
  TaskStatus,
} from "entities/task"

it.each<TaskStatus>(["active", "completed"])(
  "task removes from %s state",
  async status => {
    // Arrange
    const task = testTask({ status })

    const tasksDataSource = new TasksInMemoryDataSource()
    await tasksDataSource.update([task])

    const tasksRepository = new TasksRepository(tasksDataSource)
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

    const tasksRepository = new TasksRepository(tasksDataSource)
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
