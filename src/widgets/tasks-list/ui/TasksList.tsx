import { FC } from "react"

import { EmptyTasksListUiState, TasksListViewModel } from "../model"

import { useTasksListViewModel } from "./viewModel"

import { Task } from "./Task"

import s from "./TasksList.module.css"

export const TasksList = () => {
  const vm = useTasksListViewModel()

  return <TasksListView {...vm} />
}

export const TasksListView: FC<TasksListViewModel> = ({
  uiState,
  completeTask,
  removeTask,
  reopenTask,
}) => {
  if (uiState instanceof EmptyTasksListUiState) {
    return <p className={s.emptyMessage}>{uiState.message}</p>
  }

  return (
    <ol className={s.list}>
      {uiState.tasks.map(task => (
        <li>
          <Task
            key={task.id}
            uiState={task}
            onRemove={removeTask}
            onStatusChange={
              task.isCompleted ? reopenTask : completeTask
            }
          />
        </li>
      ))}
    </ol>
  )
}
