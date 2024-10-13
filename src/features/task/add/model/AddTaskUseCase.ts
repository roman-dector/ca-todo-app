import {
  genTaskId,
  Task,
  TasksList,
  TasksRepository,
} from "entities/task"

export type NewTaskData = Pick<Task, "title" | "description">

export class AddTaskUseCase {
  constructor(
    private readonly tasksList: TasksList,
    private readonly tasksRepository: TasksRepository
  ) {}

  private checkTaskData = (data: NewTaskData): boolean => {
    return Boolean(data.title && data.description)
  }

  public async add(data: NewTaskData) {
    if (!this.checkTaskData(data)) {
      return
    }

    this.tasksList.add({
      id: genTaskId(),
      status: "active",
      ...data,
    })

    await this.tasksRepository.updateTasks(this.tasksList)
  }
}
