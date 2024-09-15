<template>
  <button
    class="base-button"
    type="button"
  >
    <slot />
  </button>
</template>

<style lang="sass" scoped>
.base-button
  display: flex
  align-items: center
  justify-content: center
  height: 32px
  background-color: $primary-400
  border-radius: 8px
  transition: background-color 0.25s ease
  font-size: 16px
  color: $white
  padding: 0 12px

  &:hover
    background-color: $primary-300

  &:active
    background-color: $primary-500
</style>
