import { useCallback, useState } from "react"

import { AddTaskUseCase, NewTaskData } from "application/task"

import { container } from "shared/di"
import { BusEvent, EventBus } from "shared/event-bus"

import {
  addTaskFormPresentation,
  AddTaskFormViewModel,
} from "../model"

export type AddTaskFormViewModelDeps = {
  addTaskUseCase: AddTaskUseCase
  eventBus: EventBus
}

export const useAddTaskFormViewModel = (
  deps = {
    addTaskUseCase: container.get<AddTaskUseCase>(),
    eventBus: container.get<EventBus>(),
  }
): AddTaskFormViewModel => {
  const { addTaskUseCase, eventBus } = deps

  const { taskData, resetTaskData, setTitle, setDescription } =
    useTaskData()

  const changeTitle = async (title: NewTaskData["title"]) => {
    setTitle(title)
  }

  const changeDescription = async (
    description: NewTaskData["description"]
  ) => setDescription(description)

  const addTask = useCallback(
    async (data: NewTaskData) => {
      await addTaskUseCase.add(data)
      resetTaskData()
      eventBus.publish(BusEvent.newTaskAdded)
    },
    [resetTaskData]
  )

  const uiState = addTaskFormPresentation(taskData)

  return {
    uiState,
    changeTitle,
    changeDescription,
    addTask,
  }
}

const useTaskData = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const taskData: NewTaskData = { title, description }

  const resetTaskData = useCallback(() => {
    setTitle("")
    setDescription("")
  }, [setTitle, setDescription])

  return { taskData, resetTaskData, setTitle, setDescription }
}
