import "./styles/index.css"

import { TasksList } from "widgets/tasks-list"
import { AddTaskForm } from "widgets/add-task-form"

import "./config/di"

import s from "./app.module.css"

export const App = () => (
  <div className={s.root}>
    <section className={s.content}>
      <h1 className={s.heading}>ToDos</h1>

      <AddTaskForm />

      <TasksList />
    </section>
  </div>
)
