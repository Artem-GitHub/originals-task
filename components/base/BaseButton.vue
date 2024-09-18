<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset' | undefined,
    buttonStyle?: 'default' | 'text' | undefined,
  }>(),
  {
    type: 'button',
    buttonStyle: 'default',
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
    @click="onClick"
  >
    <slot />
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
  font-size: 16px
  color: $white
  padding: 0 12px

  &--text
    background-color: transparent
    color: $primary-800

    &:hover
      border-color: $primary-400

    &:active
      border-color: $primary-600

  &:not(&--text):hover
    background-color: $primary-400

  &:not(&--text):active
    background-color: $primary-600
</style>
