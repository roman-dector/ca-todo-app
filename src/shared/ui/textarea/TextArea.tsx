import { FC, TextareaHTMLAttributes } from "react"

import cl from "classnames"

import s from "./TextArea.module.css"

export type TextAreaProps = {
  value: string
  onChange: (value: string) => void
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">

export const TextArea: FC<TextAreaProps> = ({
  value,
  className,
  onChange,
  ...rest
}) => (
  <textarea
    className={cl(s.textArea, className)}
    value={value}
    onChange={e => onChange(e.target.value)}
    {...rest}
  />
)
