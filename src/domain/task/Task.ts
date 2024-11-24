export type TaskId = Brand<string>

export const TaskStatus = {
  active: "active",
  completed: "completed",
} as const
export type TaskStatus = Keys<typeof TaskStatus>

export interface Task {
  readonly id: TaskId
  readonly title: string
  readonly description: string
  readonly status: TaskStatus
}

export const genTaskId = () => crypto.randomUUID() as TaskId

export const createTestTask = (data: Partial<Task> = {}): Task => ({
  id: genTaskId(),
  title: "title",
  description: "description",
  status: "active",
  ...data,
})
