import { FC } from "react"

import s from "./Checkbox.module.css"

export type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
}) => (
  <input
    className={s.checkbox}
    type="checkbox"
    checked={checked}
    onChange={e => onChange(e.target.checked)}
  />
)
