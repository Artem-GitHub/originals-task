<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title: string,
    text?: string,
  }>(),
  {
    text: 'Are you sure?',
  }
);

const emit = defineEmits<{
  'on-cancel': [value: boolean],
  'on-confirm': [value: boolean],
}>();

const appStore = useAppStore();
</script>

<template>
  <BaseModal
    v-model="appStore.modal.isShowConfirmModal"
    class="base-confirm-modal"
  >
    <template #title>
      <div>{{ props.title }}</div>
    </template>

    <template #body>
      <div class="base-confirm-modal__text">{{ props.text }}</div>
    </template>

    <template #footer>
      <div class="base-confirm-modal__actions">
        <BaseButton
          button-style="text"
          @click="emit('on-cancel', false)"
        >
          Cancel
        </BaseButton>

        <BaseButton @click="emit('on-confirm', true)">
          Confirm
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="sass" scoped>
.base-confirm-modal
  &__text
    text-align: center
    font-size: 18px
    color: $secondary-900
    padding: 32px

  &__actions
    display: flex
    align-items: center
    justify-content: space-between
</style>
