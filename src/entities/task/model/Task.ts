export type TaskId = Brand<string>

export type TaskStatus = "active" | "completed"

export interface Task {
  readonly id: TaskId
  readonly title: string
  readonly description: string
  readonly status: TaskStatus
}

export const genTaskId = () => crypto.randomUUID() as TaskId
