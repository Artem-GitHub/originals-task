<script lang="ts" setup>
import { Priority } from '@/types';
import type {
  ResponseUserType,
  ResponseTaskType,
} from '@/types';

const props = defineProps<{ task: ResponseTaskType }>();

const userStore = useUserStore();

const user = computed<ResponseUserType | undefined>(() =>
  userStore.usersList.find((user) => user.id === props.task.performerId)
);

const userName = computed<string>(() => user.value ? user.value.name : 'N/A');

const statusColor = computed<string>(() => {
  switch (props.task.priority) {
    case Priority.low:
      return 'green';
    case Priority.medium:
      return 'orange'
    case Priority.hight:
      return 'red';
    default:
      return 'grey';
  }
});
</script>

<template>
  <div class="task-list-card">
    <div class="task-list-card__heading">
      <h4 class="task-list-card__title">{{ props.task.title }}</h4>
    </div>

    <div class="task-list-card__content">
      <div class="task-list-card__info">
        <span class="task-list-card__info-title">Performer</span>
        <span class="task-list-card__info-value">{{ userName }}</span>
      </div>

      <div class="task-list-card__info">
        <span class="task-list-card__info-title">Priority</span>
        <span class="task-list-card__info-value task-list-card__info-value_priority">
          {{ props.task.priority }}
        </span>
      </div>

      <div class="task-list-card__info">
        <span class="task-list-card__info-title">Status</span>
        <span class="task-list-card__info-value">{{ props.task.status }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.task-list-card
  display: flex
  flex-direction: column
  background-color: $white
  border-radius: 8px
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
  -moz-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
  transition: 0.25s ease
  cursor: pointer

  &:hover
    -webkit-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25)
    -moz-box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25)
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.25)

  &__heading
    padding: 12px
    border-bottom: 1px solid $secondary-200

  &__title
    font-weight: 500
    font-size: 16px
    color: $secondary-900

  &__content
    display: flex
    flex-direction: column
    row-gap: 16px
    padding: 12px

  &__info
    display: flex
    align-items: center
    justify-content: space-between
    column-gap: 12px

  &__info-title
    display: block
    font-size: 16px
    color: $secondary-800

  &__info-value
    font-size: 16px
    color: $secondary-700

  &__title,
  &__info-title,
  &__info-value
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  &__info-title,
  &__info-value
    max-width: 50%

  &__info-value_priority
    background-color: v-bind(statusColor)
    border-radius: 6px
    font-size: 14px
    color: $white
    padding: 4px 6px
</style>
