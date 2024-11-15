import {
  AddTaskUseCase,
  CompleteTaskUseCase,
  RemoveTaskUseCase,
  ReopenTaskUseCase,
  TasksListBuilder,
  type TasksRepository,
} from "application/task"

import {
  TasksRepositoryImpl,
  TasksLocalDbDataSource,
  type TasksDataSource,
} from "dal/task"

import { container } from "shared/di"
import { EventBus, EventBusNanoEventsAdapter } from "shared/event-bus"

container.registerSingleton<EventBus, EventBusNanoEventsAdapter>()

container.registerSingleton<AddTaskUseCase>()
container.registerSingleton<CompleteTaskUseCase>()
container.registerSingleton<RemoveTaskUseCase>()
container.registerSingleton<ReopenTaskUseCase>()

container.registerSingleton<TasksListBuilder>()

container.registerSingleton<TasksRepository, TasksRepositoryImpl>()

container.registerSingleton<TasksDataSource, TasksLocalDbDataSource>()
