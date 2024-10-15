import { FC, HTMLAttributes } from "react"

import cl from "classnames"

import s from "./TextArea.module.css"

export type TextAreaProps = {
  value: string
  onChange: (value: string) => void
} & Omit<HTMLAttributes<HTMLTextAreaElement>, "onChange">

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
