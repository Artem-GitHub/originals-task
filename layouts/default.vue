<template>
  <main class="main">
    <TheHeader />

    <div class="main__container">
      <slot />
    </div>

    <TaskCreateModal />
    <TaskEditModal />
  </main>
</template>

<style lang="sass" scoped>
.main
  min-height: 100vh

  &__container
    max-width: 1280px
    margin: 0  auto
    padding: 0 24px
</style>
