export type TaskId = Brand<string>

export type TaskStatus = "active" | "completed"

export interface Task {
  readonly id: TaskId
  readonly title: string
  readonly description: string
  readonly status: TaskStatus
}

export const genTaskId = () => crypto.randomUUID() as TaskId

export const testTask = (data: Partial<Task> = {}): Task => ({
  id: genTaskId(),
  title: "title",
  description: "description",
  status: "active",
  ...data,
})
