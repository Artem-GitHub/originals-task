<script lang="ts" setup>
import { Status } from '@/types';
import type { TaskListType } from '@/types';

const taskStore = useTaskStore();

const taskList = computed<TaskListType>(() => taskStore.tasksList);

const taskListTodo = computed<TaskListType>(() =>
  taskList.value.filter((task) => task.status === Status.todo)
);

const taskListInProgress = computed<TaskListType>(() =>
  taskList.value.filter((task) => task.status === Status.progress)
);

const taskListDone = computed<TaskListType>(() =>
  taskList.value.filter((task) => task.status === Status.done)
);
</script>

<template>
  <div class="task-list">
    <TaskListColumn
      column-title="TODO"
      :list-type="Status.todo"
      :task-list="taskListTodo"
    />

    <TaskListColumn
      column-title="In progress"
      :list-type="Status.progress"
      :task-list="taskListInProgress"
    />

    <TaskListColumn
      column-title="done"
      :list-type="Status.done"
      :task-list="taskListDone"
    />
  </div>
</template>

<style lang="sass" scoped>
.task-list
  display: flex
  column-gap: 24px
  margin-top: 24px
</style>
