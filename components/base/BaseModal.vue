<script lang="ts" setup>
const props = defineProps<{ modelValue: boolean }>()

const emit = defineEmits<{
  'update:modelValue': [isShowModal: boolean],
  'on-close': [e: Event],
}>();

const isShowModal = computed<boolean>({
  get () {
    return props.modelValue;
  },
  set (newValue: boolean) {
    emit('update:modelValue', newValue);
  },
});

function hideModal (event: Event): void {
  isShowModal.value = false;
  emit('on-close', event);
};
</script>

<template>
  <div
    v-if="isShowModal"
    class="base-modal"
    @click.self="hideModal"
  >
    <div class="base-modal__container">
      <div class="base-modal__head">
        <h4 class="base-modal__title">
          <slot name="title" />
        </h4>

        <button
          class="base-modal__close-button"
          type="button"
          @click="hideModal"
        >
          &#10006;
        </button>
      </div>

      <div class="base-modal__body">
        <slot name="body" />
      </div>

      <div class="base-modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.base-modal
  position: fixed
  display: flex
  align-items: center
  justify-content: center
  background-color: #00000020
  top: 0
  right: 0
  bottom: 0
  left: 0

  &__container
    display: flex
    flex-direction: column
    row-gap: 24px
    flex-basis: 600px
    background-color: $secondary-50
    border-radius: 12px
    -webkit-box-shadow: 0px 8px 20px 0px rgba(0,0,0,0.25)
    -moz-box-shadow: 0px 8px 20px 0px rgba(0,0,0,0.25)
    box-shadow: 0px 8px 20px 0px rgba(0,0,0,0.25)
    padding: 24px

  &__head
    display: flex
    align-items: center
    justify-content: space-between

  &__title
    color: $black
    font-size: 20px

  &__close-button
    width: 24px
    height: 24px
    background-color: transparent
    font-size: 18px
    color: $black
</style>
