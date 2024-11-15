import { ButtonHTMLAttributes, FC, ReactNode } from "react"

import cl from "classnames"

import s from "./Button.module.css"

export type ButtonProps = {
  text: ReactNode
  onClick?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({
  text,
  type = "button",
  className,
  onClick,
  ...rest
}) => (
  <button
    className={cl(s.button, className)}
    onClick={onClick}
    {...rest}
  >
    {text}
  </button>
)
