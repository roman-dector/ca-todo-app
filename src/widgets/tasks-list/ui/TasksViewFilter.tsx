import { FC } from "react"

import cl from "classnames"

import { TasksListView } from "../model"

import s from "./TasksViewFilter.module.css"

export type TasksViewFilterProps = {
  selected: TasksListView
  onViewSelect: (view: TasksListView) => void
}

const views: TasksListView[] = ["all", "active", "completed"]

export const TasksViewFilter: FC<TasksViewFilterProps> = ({
  selected,
  onViewSelect,
}) => (
  <section className={s.container}>
    <span className={s.label}>Show:</span>

    <ul className={s.list}>
      {views.map(view => (
        <li
          key={view}
          className={cl({ [s.selected!]: selected === view })}
          onClick={() => onViewSelect(view)}
        >
          {view}
        </li>
      ))}
    </ul>
  </section>
)
