import { EventBus } from "./EventBus"
import { EventsMap } from "./EventsMap"

import { createNanoEvents } from "nanoevents"

export class EventBusNanoEventsAdapter implements EventBus {
  private readonly emitter = createNanoEvents<EventsMap>()

  publish: EventBus["publish"] = (event, ...data) => {
    this.emitter.emit(event, ...data)
  }

  subscribeTo: EventBus["subscribeTo"] = (event, handler) =>
    this.emitter.on(event, handler)
}
