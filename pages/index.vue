<script lang="ts" setup>
const taskStore = useTaskStore();
const userStore = useUserStore();

useAsyncData('tasks', () => taskStore.getAllTasks());
useAsyncData('users', () => userStore.getAllUsers());
</script>

<template>
  <div>
    <TaskList />
  </div>
</template>
