<script lang="ts" setup>
const appStore = useAppStore();

function openCreateTaskModal (): void {
  appStore.toggleModalVisibility('isShowTaskCreateModal', true);
};
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">Logo</div>

      <div class="header__actions">
        <BaseButton @click="openCreateTaskModal">Create</BaseButton>
      </div>
    </div>
  </header>
</template>

<style lang="sass" scoped>
.header
  display: flex
  align-items: center
  justify-content: center
  height: 72px
  background-color: $primary-800

  &__container
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    max-width: 1280px
    padding: 0 32px

  &__logo
    text-transform: uppercase
    font-weight: 600
    font-size: 32px
    color: $white

  &__actions
    display: inline-flex
    align-items: center
</style>
