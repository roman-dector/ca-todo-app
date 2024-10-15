import { FC, FormEventHandler } from "react"

import { AddTaskFormViewModel, DisabledSubmitUiState } from "../model"
import { useAddTaskFormViewModel } from "./viewModel"

import s from "./AddTaskForm.module.css"
import { TextField } from "shared/ui/text-field"
import { Button } from "shared/ui/button"
import { TextArea } from "shared/ui/textarea"

export const AddTaskForm = () => {
  const vm = useAddTaskFormViewModel()

  return <AddTaskFormView {...vm} />
}

export const AddTaskFormView: FC<AddTaskFormViewModel> = ({
  uiState,
  changeTitle,
  changeDescription,
  addTask,
}) => {
  const handleSubmit: FormEventHandler = e => {
    e.preventDefault()

    addTask({
      title: uiState.title,
      description: uiState.description,
    })
  }

  const isSubmitDisabled = uiState instanceof DisabledSubmitUiState

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.row}>
          <TextField
            tabIndex={1}
            value={uiState.title}
            onChange={changeTitle}
          />

          <Button
            tabIndex={3}
            text={"Add"}
            type={"submit"}
            disabled={isSubmitDisabled}
          />
        </div>

        <TextArea
          tabIndex={2}
          value={uiState.description}
          onChange={changeDescription}
        />
      </form>

      {isSubmitDisabled && (
        <p className={s.hintMsg}>{uiState.message}</p>
      )}
    </div>
  )
}
