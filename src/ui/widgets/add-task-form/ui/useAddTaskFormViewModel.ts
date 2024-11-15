import { useCallback, useState } from "react"

import { AddTaskUseCase, NewTaskData } from "application/task"

import { container } from "shared/di"
import { EventBus } from "shared/event-bus"

import {
  addTaskFormPresentation,
  AddTaskFormViewModel,
} from "../model"

export const useAddTaskFormViewModel = (
  addTaskUseCase = container.get<AddTaskUseCase>(),
  eventBus = container.get<EventBus>()
): AddTaskFormViewModel => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const taskData: NewTaskData = { title, description }

  const resetFields = useCallback(() => {
    setTitle("")
    setDescription("")
  }, [setTitle, setDescription])

  return {
    uiState: addTaskFormPresentation(taskData),

    changeTitle: setTitle,
    changeDescription: setDescription,

    addTask: async (data: NewTaskData) => {
      await addTaskUseCase.add(data)
      resetFields()
      eventBus.publish("newTaskAdded")
    },
  }
}
