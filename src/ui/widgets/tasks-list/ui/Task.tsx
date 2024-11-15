import { FC } from "react"
import { TaskId } from "domain/task"

import { IconButton } from "shared/ui/button"
import { Checkbox } from "shared/ui/checkbox"

import { TaskUiState } from "../model"

import TrashIcon from "./assets/trash.svg?react"

import s from "./Task.module.css"

export type TaskProps = {
  uiState: TaskUiState
  onRemove: (id: TaskId) => void
  onStatusChange: (id: TaskId) => void
}

export const Task: FC<TaskProps> = ({
  uiState,
  onRemove,
  onStatusChange,
}) => (
  <article className={s.task}>
    <div className={s.checkboxContainer}>
      <Checkbox
        checked={uiState.isCompleted}
        onChange={() => onStatusChange(uiState.id)}
      />
    </div>

    <div className={s.textContent}>
      <h1 className={s.title}>{uiState.title}</h1>
      <p className={s.description}>{uiState.description}</p>
    </div>

    <IconButton
      icon={<TrashIcon />}
      onClick={() => onRemove(uiState.id)}
    />
  </article>
)
