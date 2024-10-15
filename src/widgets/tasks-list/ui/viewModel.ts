import { useCallback, useEffect, useState } from "react"

import {
  CompleteTaskUseCase,
  RemoveTaskUseCase,
  ReopenTaskUseCase,
} from "features/task"

import {
  TaskId,
  TasksRepository,
  tasksSplittedByStatus,
  TasksSplittedByStatus,
} from "entities/task"

import { container } from "shared/di"

import {
  tasksListPresentation,
  type TasksListView,
  type TasksListViewModel,
  type TasksListStatus,
} from "../model"

import { EventBus } from "shared/event-bus"
import { asyncDelay } from "shared/lib"

export const useTasksListViewModel = (
  completeTaskUseCase = container.get<CompleteTaskUseCase>(),
  removeTaskUseCase = container.get<RemoveTaskUseCase>(),
  reopenTaskUseCase = container.get<ReopenTaskUseCase>(),
  tasksRepository = container.get<TasksRepository>(),
  eventBus = container.get<EventBus>()
): TasksListViewModel => {
  const [tasks, setTasks] = useState<TasksSplittedByStatus>(
    tasksSplittedByStatus()
  )

  const [listView, setListView] = useState<TasksListView>("all")

  const [listStatus, setListStatus] =
    useState<TasksListStatus>("initial")

  const fetchTasks = useCallback(async () => {
    const tasks = await tasksRepository.fetchAll()
    setTasks(tasks)
  }, [tasksRepository, setTasks])

  useEffect(() => {
    void (async () => {
      setListStatus("loading")

      await asyncDelay(fetchTasks, 300)

      setListStatus("idle")
    })()
  }, [fetchTasks])

  useEffect(
    () => eventBus.subscribeTo("newTaskAdded", fetchTasks),
    [eventBus, fetchTasks]
  )

  return {
    uiState: tasksListPresentation(tasks, listView, listStatus),

    switchView: setListView,

    completeTask: async (id: TaskId) => {
      await completeTaskUseCase.complete(id)
      await fetchTasks()
    },
    removeTask: async (id: TaskId) => {
      await removeTaskUseCase.remove(id)
      await fetchTasks()
    },
    reopenTask: async (id: TaskId) => {
      await reopenTaskUseCase.reopen(id)
      await fetchTasks()
    },
  }
}
