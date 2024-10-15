import { ButtonHTMLAttributes, FC, ReactNode } from "react"

import s from "./IconButton.module.css"

export type IconButtonProps = {
  icon: ReactNode
  onClick?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton: FC<IconButtonProps> = ({
  icon,
  type = "button",
  ...rest
}) => (
  <button className={s.iconButton} type={type} {...rest}>
    {icon}
  </button>
)
