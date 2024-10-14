import { FC } from "react"
import { AddTaskFormViewModel } from "../model"
import { useAddTaskFormViewModel } from "./viewModel"

export const AddTaskForm = () => {
  const vm = useAddTaskFormViewModel()

  return <AddTaskFormView {...vm} />
}

export const AddTaskFormView: FC<AddTaskFormViewModel> = ({
  uiState,
  changeTitle,
  changeDescription,
  addTask,
}) => (
  <div>
    <input
      type="text"
      value={uiState.title}
      onChange={e => changeTitle(e.target.value)}
    />
    <textarea
      value={uiState.description}
      onChange={e => changeDescription(e.target.value)}
    />
    <button
      onClick={() =>
        addTask({
          title: uiState.title,
          description: uiState.description,
        })
      }
    >
      Add
    </button>
  </div>
)
