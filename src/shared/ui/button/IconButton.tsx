import { FC, HTMLAttributes, ReactNode } from "react"

import s from "./IconButton.module.css"

export type IconButtonProps = {
  icon: ReactNode

  type?: "button" | "submit"
  disabled?: boolean

  onClick?: () => void
} & HTMLAttributes<HTMLButtonElement>

export const IconButton: FC<IconButtonProps> = ({
  icon,
  type = "button",
  ...rest
}) => (
  <button className={s.iconButton} type={type} {...rest}>
    {icon}
  </button>
)
