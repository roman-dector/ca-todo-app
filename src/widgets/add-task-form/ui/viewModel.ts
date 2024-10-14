import { useCallback, useState } from "react"

import { AddTaskUseCase, NewTaskData } from "features/task"

import {
  addTaskFormPresentation,
  AddTaskFormViewModel,
} from "../model"
import { container } from "shared/di"

export const useAddTaskFormViewModel = (
  addTaskUseCase = container.get<AddTaskUseCase>()
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
    },
  }
}
