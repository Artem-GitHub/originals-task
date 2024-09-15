<script lang="ts" setup>
const taskStore = useTaskStore();
</script>

<template>
  <BaseModal v-model="taskStore.isShowTaskModal">
    <template #title>
      <div>Create new task</div>
    </template>

    <template #body>
      <div>Create Modal</div>
    </template>
  </BaseModal>
</template>

<style lang="sass" scoped></style>
