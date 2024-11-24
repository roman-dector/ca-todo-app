import { FC, FormEventHandler } from "react"

import { AddTaskFormViewModel, AddTaskFormUiState } from "../model"
import { useAddTaskFormViewModel } from "./useAddTaskFormViewModel"

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

  const isSubmitDisabled =
    uiState instanceof AddTaskFormUiState.DisabledSubmit

  const submitButton = (
    <Button
      tabIndex={3}
      text={"Add"}
      type={"submit"}
      disabled={isSubmitDisabled}
    />
  )

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.row}>
          <TextField
            tabIndex={1}
            placeholder={"Task title"}
            value={uiState.title}
            onChange={changeTitle}
          />

          <div className={"desktop"}>{submitButton}</div>
        </div>

        <TextArea
          tabIndex={2}
          placeholder={"Task description"}
          value={uiState.description}
          onChange={changeDescription}
        />

        <div className={"mobile"}>{submitButton}</div>
      </form>

      <p className={s.hintContainer}>
        {isSubmitDisabled && (
          <span className={s.hintMsg}>{uiState.message}</span>
        )}
      </p>
    </div>
  )
}
