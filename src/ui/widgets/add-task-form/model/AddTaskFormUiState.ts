import { NewTaskData } from "application/task"

export class AddTaskFormUiState implements NewTaskData {
  title: string
  description: string

  constructor(arg: AddTaskFormUiState) {
    Object.assign(this, arg)
  }
}

export class DisabledSubmitUiState extends AddTaskFormUiState {
  message?: string = "You should fill all fields"

  constructor(arg: DisabledSubmitUiState) {
    super(arg)
    Object.assign(this, arg)
  }
}
