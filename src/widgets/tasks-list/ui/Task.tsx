import { FC } from "react"
import { TaskUiState } from "../model"
import { TaskId } from "entities/task"

export type TaskProps = {
  uiState: TaskUiState
  onRemove: (id: TaskId) => void
  onStatusChange: (id: TaskId) => void
}

export const Task: FC<TaskProps> = ({
  uiState,
  onRemove,
  onStatusChange,
}) => {
  return (
    <article>
      <h3>{uiState.title}</h3>
      <input
        type="checkbox"
        checked={uiState.isCompleted}
        onChange={() => onStatusChange(uiState.id)}
      />
      <p>{uiState.description}</p>
      <button onClick={() => onRemove(uiState.id)}>Remove</button>
    </article>
  )
}
