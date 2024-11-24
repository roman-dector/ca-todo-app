import type {
  Task,
  TasksList,
  TasksEntrySplittedByStatus,
} from "domain/task"

import type { TasksRepository } from "application/task"

import type { TasksDataSource } from "./TasksDataSource"

export class TasksRepositoryFacade implements TasksRepository {
  constructor(private readonly tasksDataSource: TasksDataSource) {}

  async fetchAll(): Promise<TasksEntrySplittedByStatus> {
    const data = await this.tasksDataSource.fetchAll()

    return this.tasksToDomain(data)
  }

  async updateTasks(data: TasksList): Promise<void> {
    const tasks = this.tasksListToStore(data)

    return this.tasksDataSource.update(tasks)
  }

  private tasksListToStore(tasksList: TasksList): Task[] {
    const { active, completed } = tasksList.toSplittedByStatus()

    return [...active, ...completed]
  }

  private tasksToDomain(tasks: Task[]): TasksEntrySplittedByStatus {
    const accumulator: TasksEntrySplittedByStatus = {
      active: [],
      completed: [],
    }

    return tasks.reduce(this.categorizeByStatus, accumulator)
  }

  private categorizeByStatus(
    accumulator: TasksEntrySplittedByStatus,
    task: Task
  ): TasksEntrySplittedByStatus {
    if (task.status === "completed") {
      accumulator.completed.push([task.id, task])
    } else {
      accumulator.active.push([task.id, task])
    }

    return accumulator
  }
}
