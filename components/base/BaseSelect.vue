<script lang="ts" setup>
import type { SelectValueType, SelectOptionsType } from '@/types';

const props = withDefaults(
  defineProps<{
    modelValue: SelectValueType,
    options: SelectOptionsType,
    placeholder: string,
    label?: string | null,
    trackBy?: string | null,
    selectLabel?: string | null,
    searchable?: boolean,
  }>(),
  {
    label: null,
    trackBy: null,
    selectLabel: null,
    searchable: false,
  },
);

const emit = defineEmits<{ 'update:modelValue': [selectValue: SelectValueType] }>();

const selectValue = computed<SelectValueType>({
  get () {
    return props.modelValue;
  },
  set (newValue: SelectValueType) {
    emit('update:modelValue', newValue);
  },
});
</script>

<template>
  <div class="base-select">
    <label
      v-if="label"
      class="base-select__label"
    >
      {{ label }}
    </label>

    <Multiselect
      v-model="selectValue"
      :options="options"
      :track-by="trackBy"
      :label="selectLabel"
      :placeholder="placeholder"
      :searchable="searchable"
      :show-labels="false"
      open-direction="bottom"
    />
  </div>
</template>

<style lang="sass" scoped>
.base-select
  display: flex
  flex-direction: column

  &__label
    font-size: 18px
    color: $secondary-800
    margin-bottom: 8px

  & :deep(.multiselect)
    height: 36px
    min-height: 36px
    border: none
    border-radius: 6px
    -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
    -moz-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
    transition: box-shadow 0.25s ease

    &:focus
      -webkit-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25)
      -moz-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25)
      box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25)

    .multiselect__tags
      min-height: 36px
      padding-left: 12px

    .multiselect__input
      font-size: 16px
      color: $secondary-900

    .multiselect__placeholder
      font-size: 16px
      color: $secondary-500

    .multiselect__option--highlight,
    .multiselect__option--highlight::after
      background-color: $secondary-50
      color: $secondary-900

    .multiselect__option--selected,
    .multiselect__option--selected::after
      background-color: $secondary-100
</style>
