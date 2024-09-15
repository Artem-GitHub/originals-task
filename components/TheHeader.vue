<template>
  <header class="header">
    <div class="header__logo">Logo</div>

    <div class="header__actions">
      <BaseButton>Create</BaseButton>
    </div>
  </header>
</template>

<style lang="sass" scoped>
.header
  display: flex
  align-items: center
  justify-content: space-between
  height: 72px
  background-color: $primary-800
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
