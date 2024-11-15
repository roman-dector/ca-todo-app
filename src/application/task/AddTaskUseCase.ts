import { genTaskId, type Task } from "domain/task"

import { TasksListBuilder } from "./TasksListBuilder"

import { type TasksRepository } from "./TasksRepository"

export type NewTaskData = Pick<Task, "title" | "description">

export class AddTaskUseCase {
  constructor(
    private readonly tasksListBuilder: TasksListBuilder,
    private readonly tasksRepository: TasksRepository
  ) {}

  private checkTaskData = (data: NewTaskData): boolean => {
    return Boolean(data.title && data.description)
  }

  public async add(data: NewTaskData) {
    if (!this.checkTaskData(data)) {
      return
    }

    const tasksList = await this.tasksListBuilder.build()

    tasksList.add({
      id: genTaskId(),
      status: "active",
      ...data,
    })

    await this.tasksRepository.updateTasks(tasksList)
  }
}
