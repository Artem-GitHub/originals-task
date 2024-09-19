<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset' | undefined,
    buttonStyle?: 'default' | 'text' | undefined,
    disabled?: boolean,
    loading?: boolean,
  }>(),
  {
    type: 'button',
    buttonStyle: 'default',
    disabled: false,
    loading: false,
  },
);

const emit = defineEmits<{(e: 'click', event: Event): void}>();

function onClick (event: Event): void {
  emit('click', event);
};
</script>

<template>
  <button
    class="base-button"
    :class="{ 'base-button--text': props.buttonStyle === 'text'}"
    :type="props.type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />

    <div
      v-if="loading"
      class="base-button__spinner"
    >
      <span class="base-button__spinner-ring" />
    </div>
  </button>
</template>

<style lang="sass" scoped>
.base-button
  display: flex
  align-items: center
  justify-content: center
  height: 36px
  background-color: $primary-500
  border-radius: 8px
  transition: background-color 0.25s, color 0.25s ease
  overflow: hidden
  font-size: 16px
  color: $white
  padding: 0 12px
  position: relative

  &--text
    background-color: transparent
    color: $primary-800

    &:hover
      color: $primary-400

    &:active
      color: $primary-600

    &:not(&--text):disabled
      color: $secondary-200

  &:not(&--text):hover
    background-color: $primary-400

  &:not(&--text):active
    background-color: $primary-600

  &:not(&--text):disabled
    background-color: $secondary-200

  &__spinner
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    background-color: inherit
    position: absolute

    &-ring
      width: 28px
      height: 28px
      border: 3px solid $primary-600
      border-top-color: $primary-300
      border-radius: 50%
      animation: spinner 1s linear infinite

  @keyframes spinner
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>
