import { AddTaskUseCase } from "features/task"

import {
  TasksDataSource,
  TasksInMemoryDataSource,
  TasksListBuilder,
  TasksRepository,
} from "entities/task"

import { container } from "shared/di"

container.registerSingleton<AddTaskUseCase>()

container.registerSingleton<TasksListBuilder>()

container.registerSingleton<TasksRepository>()
container.registerSingleton<
  TasksDataSource,
  TasksInMemoryDataSource
>()
