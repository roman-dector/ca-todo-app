import { FC } from "react"

import {
  EmptyTasksListUiState,
  TasksListViewModel,
  TasksLoadingUiState,
} from "../model"

import { useTasksListViewModel } from "./viewModel"

import { Task } from "./Task"

import s from "./TasksList.module.css"
import { TasksViewFilter } from "./TasksViewFilter"
import { Loader } from "shared/ui/loader"
import { Chip } from "shared/ui/chip"

export const TasksList = () => {
  const vm = useTasksListViewModel()

  return <TasksListView {...vm} />
}

export const TasksListView: FC<TasksListViewModel> = ({
  uiState,
  switchView,
  completeTask,
  removeTask,
  removeAllCompleted,
  reopenTask,
}) => {
  if (uiState instanceof TasksLoadingUiState) {
    return <Loader />
  }

  const isEmpty = uiState instanceof EmptyTasksListUiState

  return (
    <section className={s.container}>
      <TasksViewFilter
        selected={uiState.view}
        tasksCount={uiState.tasksCount}
        onViewSelect={switchView}
      />

      {isEmpty ? (
        <p className={s.emptyMessage}>{uiState.message}</p>
      ) : (
        <>
          {uiState.view === "completed" && (
            <ul className={s.actionBar}>
              <li>
                <Chip
                  text={"Clear completed"}
                  onClick={removeAllCompleted}
                />
              </li>
            </ul>
          )}

          <ol className={s.list}>
            {uiState.tasks.map(task => (
              <li key={task.id}>
                <Task
                  uiState={task}
                  onRemove={removeTask}
                  onStatusChange={
                    task.isCompleted ? reopenTask : completeTask
                  }
                />
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  )
}
