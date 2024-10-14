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

import { tasksListPresentation, TasksListViewModel } from "../model"
import { EventBus } from "shared/event-bus"

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

  const fetchTasks = useCallback(async () => {
    const tasks = await tasksRepository.fetchAll()
    setTasks(tasks)
  }, [tasksRepository, setTasks])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  useEffect(
    () => eventBus.subscribeTo("newTaskAdded", fetchTasks),
    [eventBus, fetchTasks]
  )

  return {
    uiState: tasksListPresentation(tasks),

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
