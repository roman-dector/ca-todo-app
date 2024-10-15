import { FC } from "react"

import cl from "classnames"

import { TasksCount, TasksListView } from "../model"

import s from "./TasksViewFilter.module.css"
import { Chip } from "shared/ui/chip"

export type TasksViewFilterProps = {
  selected: TasksListView
  tasksCount: TasksCount
  onViewSelect: (view: TasksListView) => void
}

const views: TasksListView[] = ["all", "active", "completed"]

export const TasksViewFilter: FC<TasksViewFilterProps> = ({
  selected,
  tasksCount,
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
          <Chip text={`${view} ${tasksCount[view]}`} />
        </li>
      ))}
    </ul>
  </section>
)
