import { NewTaskData } from "application/task"

class ReadyToSubmit implements NewTaskData {
  title: string
  description: string

  constructor(arg: ReadyToSubmit) {
    Object.assign(this, arg)
  }
}

class DisabledSubmit extends ReadyToSubmit {
  message?: string = "You should fill all fields"

  constructor(arg: DisabledSubmit) {
    super(arg)
    Object.assign(this, arg)
  }
}

export const AddTaskFormUiState = {
  DisabledSubmit,
  ReadyToSubmit,
}

export type AddTaskFormUiState = InstanceValues<
  typeof AddTaskFormUiState
>
