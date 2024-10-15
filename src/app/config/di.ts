import {
  AddTaskUseCase,
  CompleteTaskUseCase,
  RemoveTaskUseCase,
  ReopenTaskUseCase,
} from "features/task"

import {
  TasksDataSource,
  TasksListBuilder,
  TasksLocalDbDataSource,
  TasksRepository,
} from "entities/task"

import { container } from "shared/di"
import { EventBus, EventBusNanoEventsAdapter } from "shared/event-bus"

container.registerSingleton<EventBus, EventBusNanoEventsAdapter>()

container.registerSingleton<AddTaskUseCase>()
container.registerSingleton<CompleteTaskUseCase>()
container.registerSingleton<RemoveTaskUseCase>()
container.registerSingleton<ReopenTaskUseCase>()

container.registerSingleton<TasksListBuilder>()

container.registerSingleton<TasksRepository>()

container.registerSingleton<TasksDataSource, TasksLocalDbDataSource>()
