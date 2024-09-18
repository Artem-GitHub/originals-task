<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    isLoading?: boolean
  }>(),
  {
    isLoading: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [isShowModal: boolean],
  'on-open': [value: boolean],
  'on-close': [value: boolean],
}>();

const isShowModal = computed<boolean>({
  get () {
    return props.modelValue;
  },
  set (newValue: boolean) {
    emit('update:modelValue', newValue);
  },
});

watch(
  () => isShowModal.value,
  (newValue: boolean) => {
    if (newValue) {
      emit('on-open', newValue);
    } else {
      emit('on-close', newValue);
    }
  }
);

function hideModal (): void {
  isShowModal.value = false;
};
</script>

<template>
  <div
    v-if="isShowModal"
    class="base-modal"
    @click.self="hideModal"
  >
    <div class="base-modal__container">
      <template v-if="isLoading">
        <div class="base-modal__loader">
          Loading...
        </div>
      </template>

      <template v-else>
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
      </template>
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
    flex-basis: 600px
    background-color: $secondary-50
    border-radius: 12px
    -webkit-box-shadow: 0px 8px 20px 0px rgba(0,0,0,0.25)
    -moz-box-shadow: 0px 8px 20px 0px rgba(0,0,0,0.25)
    box-shadow: 0px 8px 20px 0px rgba(0,0,0,0.25)
    padding: 24px
    max-height: 96%
    overflow-y: auto

  &__loader
    text-align: center
    font-size: 28px
    color: $secondary-800
    padding: 32px

  &__head
    display: flex
    align-items: center
    justify-content: space-between

  &__body
    flex: 1
    padding: 24px 0
    // overflow: auto

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
