<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: string,
    type?: string,
    name: string,
    placeholder: string,
    label?: string | null,
    rules: string,
    validateOnInput?: boolean,
  }>(),
  {
    type: 'text',
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
  <div class="base-input">
    <label
      v-if="label"
      class="base-input__label"
      :for="name"
    >
      {{ label }}
    </label>

    <Field
      :id="name"
      v-model="inputValue"
      class="base-input__field"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :rules="rules"
      :validate-on-input="validateOnInput"
    />

    <ErrorMessage
      class="base-input__error-massage"
      :name="name"
    />
  </div>
</template>

<style lang="sass" scoped>
.base-input
  display: flex
  flex-direction: column

  &__label
    font-size: 18px
    color: $secondary-800
    margin-bottom: 8px

  &__field
    width: 100%
    height: 36px
    background-color: $white
    -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
    -moz-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
    transition: box-shadow 0.25s ease
    border-radius: 6px
    border: none
    outline: none
    color: $secondary-900
    font-size: 16px
    padding: 0 12px

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
