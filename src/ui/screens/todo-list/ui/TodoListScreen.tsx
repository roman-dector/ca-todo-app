import s from "./TodoListScreen.module.css"

import { TasksList } from "widgets/tasks-list"
import { AddTaskForm } from "widgets/add-task-form"

export const TodoListScreen = () => (
  <div className={s.root}>
    <section className={s.content}>
      <h1 className={s.heading}>ToDos</h1>

      <AddTaskForm />

      <TasksList />
    </section>
  </div>
)
