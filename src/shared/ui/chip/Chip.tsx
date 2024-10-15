import { FC, ReactNode } from "react"

import s from "./Chip.module.css"

export type ChipProps = {
  text: ReactNode
  onClick?: () => void
}

export const Chip: FC<ChipProps> = ({ text, onClick }) => {
  return (
    <div className={s.chip} onClick={onClick}>
      {text}
    </div>
  )
}
