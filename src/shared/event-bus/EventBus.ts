import { EventsMap } from "./EventsMap"

type UnsubscribeFrom<_, __> = () => void

export interface EventBus {
  publish<Event extends keyof EventsMap>(
    event: Event,
    ...data: Parameters<EventsMap[Event]>
  ): void

  subscribeTo<
    Event extends keyof EventsMap,
    Handler extends EventsMap[Event]
  >(
    event: Event,
    handler: Handler
  ): UnsubscribeFrom<Event, Handler>
}
