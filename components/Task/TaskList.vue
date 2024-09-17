<script lang="ts" setup>
import { Status } from '@/types';
import type { ResponseTaskListType } from '@/types';

const taskStore = useTaskStore();

const taskList = computed<ResponseTaskListType>(() => taskStore.tasksList);

const taskListTodo = computed<ResponseTaskListType>(() => 
  taskList.value.filter((task) => task.status === Status.todo)
);

const taskListInProgress = computed<ResponseTaskListType>(() =>
  taskList.value.filter((task) => task.status === Status.progress)
);

const taskListDone = computed<ResponseTaskListType>(() =>
  taskList.value.filter((task) => task.status === Status.done)
);
</script>

<template>
  <div class="task-list">
    <TaskListColumn
      column-title="TODO"
      :task-list="taskListTodo"
    />

    <TaskListColumn
      column-title="In progress"
      :task-list="taskListInProgress"
    />

    <TaskListColumn
      column-title="done"
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
