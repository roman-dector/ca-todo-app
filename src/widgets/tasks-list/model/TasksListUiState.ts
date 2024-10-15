import { genTaskId, TaskId } from "entities/task"

export type TasksListView = "all" | "active" | "completed"

export type TasksListStatus = "initial" | "loading" | "idle"

export type TasksCount = {
  all: number
  active: number
  completed: number
}

export class TaskUiState {
  id: TaskId
  title: string
  description: string
  isCompleted: boolean

  constructor(arg: TaskUiState) {
    Object.assign(this, arg)
  }
}

export const taskUiState = (
  data: Partial<TaskUiState> = {}
): TaskUiState => ({
  id: genTaskId(),
  title: "",
  description: "",
  isCompleted: false,
  ...data,
})

export class TasksListUiState {
  tasks: TaskUiState[]
  view: TasksListView
  tasksCount: TasksCount

  constructor(arg: TasksListUiState) {
    Object.assign(this, arg)
  }
}

export const tasksListUiState = (
  data: Partial<TasksListUiState> = {}
): TasksListUiState => ({
  tasks: [],
  view: "active",
  tasksCount: { all: 0, active: 0, completed: 0 },
  ...data,
})

export class EmptyTasksListUiState {
  message: string
  view: TasksListView
  tasksCount: TasksCount

  constructor(arg: EmptyTasksListUiState) {
    Object.assign(this, arg)
  }
}

export class TasksLoadingUiState {}
