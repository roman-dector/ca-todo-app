import { Task, TaskId } from "./Task"

export type TaskEntry = [TaskId, Task]

export interface TasksEntrySplittedByStatus {
  active: TaskEntry[]
  completed: TaskEntry[]
}

export interface TasksSplittedByStatus {
  active: Task[]
  completed: Task[]
}

export const tasksSplittedByStatus = (
  data: Partial<TasksEntrySplittedByStatus> = {}
): TasksEntrySplittedByStatus => ({
  active: [],
  completed: [],
  ...data,
})

export class TasksList {
  private active: Map<TaskId, Task>
  private completed: Map<TaskId, Task>

  constructor({ active, completed }: TasksEntrySplittedByStatus) {
    this.active = new Map(active)
    this.completed = new Map(completed)
  }

  add(task: Task) {
    if (this.active.has(task.id)) {
      return
    }

    this.active.set(task.id, task)
  }

  remove(id: TaskId) {
    if (this.active.has(id)) {
      this.active.delete(id)
    } else if (this.completed.has(id)) {
      this.completed.delete(id)
    }
  }

  complete(id: TaskId) {
    const task = this.active.get(id)

    if (task) {
      this.active.delete(id)
      this.completed.set(id, {
        ...task,
        status: "completed",
      })
    }
  }

  reopen(id: TaskId) {
    const task = this.completed.get(id)

    if (task) {
      this.completed.delete(id)
      this.active.set(id, { ...task, status: "active" })
    }
  }

  toSplittedByStatus(): TasksSplittedByStatus {
    return {
      active: Array.from(this.active.values()),
      completed: Array.from(this.completed.values()),
    }
  }
}
