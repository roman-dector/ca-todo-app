import { FC } from "react"

import { EmptyTasksListUiState, TasksListViewModel } from "../model"

import { useTasksListViewModel } from "./viewModel"

import { Task } from "./Task"

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
    return <div>{uiState.message}</div>
  }

  return (
    <section>
      <h1>ToDo List</h1>
      {uiState.tasks.map(task => (
        <Task
          key={task.id}
          uiState={task}
          onRemove={removeTask}
          onStatusChange={
            task.isCompleted ? reopenTask : completeTask
          }
        />
      ))}
    </section>
  )
}
