import { EventsMap } from "./EventsMap"

type UnsubscribeFrom = () => void

export interface EventBus {
  publish<Event extends keyof EventsMap>(
    event: Event,
    ...data: Parameters<EventsMap[Event]>
  ): void

  subscribeTo<Event extends keyof EventsMap>(
    event: Event,
    handler: EventsMap[Event]
  ): UnsubscribeFrom
}
