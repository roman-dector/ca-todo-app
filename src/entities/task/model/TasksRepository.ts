import type { Task } from "./Task"
import type { TasksList, TasksSplittedByStatus } from "./TasksList"

export interface TasksDataSource {
  fetchAll(): Promise<Task[]>
  update(tasks: Task[]): Promise<void>
}

// по ЧА он тут явно лишний, но по FSD его и приткнуть то больше некуда... Дилема.
export class TasksRepository {
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
