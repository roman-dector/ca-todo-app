import { FC, HTMLAttributes, ReactNode } from "react"

import cl from "classnames"

import s from "./Button.module.css"

export type ButtonProps = {
  text: ReactNode

  type?: "button" | "submit"
  disabled?: boolean

  onClick?: () => void
} & HTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({
  text,
  type = "button",
  disabled,
  className,
  onClick,
  ...rest
}) => (
  <button
    className={cl(s.button, className)}
    type={type}
    disabled={disabled}
    onClick={onClick}
    {...rest}
  >
    {text}
  </button>
)
