export const BusEvent = {
  newTaskAdded: "newTaskAdded",
} as const

export type BusEvent = Keys<typeof BusEvent>
