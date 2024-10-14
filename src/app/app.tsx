import { TasksList } from "widgets/tasks-list"
import "./config/di"

import { AddTaskForm } from "widgets/add-task-form"

export const App = () => {
  return (
    <div>
      <AddTaskForm />
      <TasksList />
    </div>
  )
}
