export class TaskUiState {
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
  title: "",
  description: "",
  isCompleted: false,
  ...data,
})

export class TasksListUiState {
  tasks: TaskUiState[]

  constructor(arg: TasksListUiState) {
    Object.assign(this, arg)
  }
}

export const tasksListUiState = (
  data: Partial<TasksListUiState> = {}
): TasksListUiState => ({
  tasks: [],
  ...data,
})

export class EmptyTasksListUiState {
  message: string = "Nothing to do"

  constructor(arg?: EmptyTasksListUiState) {
    Object.assign(this, arg)
  }
}
