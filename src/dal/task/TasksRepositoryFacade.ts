import type {
  Task,
  TasksList,
  TasksSplittedByStatus,
} from "domain/task"

import type { TasksRepository } from "application/task"

import type { TasksDataSource } from "./TasksDataSource"

export class TasksRepositoryFacade implements TasksRepository {
  constructor(private readonly tasksDataSource: TasksDataSource) {}

  async fetchAll(): Promise<TasksSplittedByStatus> {
    const data = await this.tasksDataSource.fetchAll()

    return this.tasksToDomain(data)
  }

  async updateTasks(data: TasksList): Promise<void> {
    const tasks = this.tasksListToStore(data)

    return this.tasksDataSource.update(tasks)
  }

  protected tasksListToStore(tasksList: TasksList): Task[] {
    return [
      ...tasksList.active.values(),
      ...tasksList.completed.values(),
    ]
  }

  protected tasksToDomain(tasks: Task[]): TasksSplittedByStatus {
    return tasks.reduce<TasksSplittedByStatus>(
      (acc, task) => {
        if (task.status === "completed") {
          acc.completed.push([task.id, task])
        } else {
          acc.active.push([task.id, task])
        }

        return acc
      },
      { active: [], completed: [] }
    )
  }
}
