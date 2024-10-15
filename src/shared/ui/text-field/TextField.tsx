import { FC, HTMLAttributes } from "react"

import cl from "classnames"

import s from "./TextField.module.css"

export type TextFieldProps = {
  value: string
  width?: string
  onChange: (value: string) => void
} & Omit<HTMLAttributes<HTMLInputElement>, "onChange">

export const TextField: FC<TextFieldProps> = ({
  value,
  width,
  className,
  onChange,
  ...rest
}) => (
  <input
    style={{ width: width ?? "100%" }}
    className={cl(s.input, className)}
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    {...rest}
  />
)
