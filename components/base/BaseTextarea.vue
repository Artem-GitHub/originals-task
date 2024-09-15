<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: string,
    name: string,
    placeholder: string,
    label?: string | null,
    rules: string,
    validateOnInput?: boolean,
  }>(),
  {
    label: null,
    validateOnInput: false,
  },
);

const emit = defineEmits<{ 'update:modelValue': [inputValue: string] }>();

const inputValue = computed<string>({
  get () {
    return props.modelValue;
  },
  set (newValue: string) {
    emit('update:modelValue', newValue);
  },
});
</script>

<template>
  <div class="base-textarea">
    <label
      v-if="label"
      class="base-textarea__label"
      :for="name"
    >
      {{ label }}
    </label>

    <Field
      :id="name"
      v-model="inputValue"
      class="base-textarea__field"
      as="textarea"
      :name="name"
      :placeholder="placeholder"
      :rules="rules"
      :validate-on-input="validateOnInput"
    />

    <ErrorMessage
      class="base-textarea__error-massage"
      :name="name"
    />
  </div>
</template>

<style lang="sass" scoped>
.base-textarea
  display: flex
  flex-direction: column

  &__label
    font-size: 18px
    color: $secondary-800
    margin-bottom: 8px

  &__field
    height: 88px
    background-color: $white
    -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
    -moz-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
    transition: box-shadow 0.25s ease
    border: none
    border-radius: 6px
    outline: none
    resize: none
    color: $secondary-900
    font-size: 16px
    padding: 12px

    &::placeholder
      color: $secondary-500

    &:focus
      -webkit-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25)
      -moz-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25)
      box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25)

  &__error-massage
    color: red
    font-size: 14px
    margin-top: 4px
</style>
