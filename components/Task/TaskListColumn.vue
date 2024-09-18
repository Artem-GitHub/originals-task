<script lang="ts" setup>
import Sortable from 'sortablejs';
import type { SortableEvent } from 'sortablejs';
import type { TaskListType } from '@/types';

const props = defineProps<{
  columnTitle: string,
  taskList: TaskListType,
}>();

const listElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (listElement.value) {
    createSortable(listElement.value, props.taskList);
  }
});

function createSortable (listRef: HTMLElement, list: TaskListType): void {
  Sortable.create(listRef, {
    group: 'tasks',
    animation: 150,
    onEnd: (event: SortableEvent) => {
      updateList(event, list);
    },
  });
};

function updateList (event: SortableEvent, list: TaskListType) {
  const { oldIndex, newIndex } = event;

  if (oldIndex && newIndex) {
    const movedItem = list.splice(oldIndex, 1)[0];
    list.splice(newIndex, 0, movedItem);
  }
};
</script>

<template>
  <div class="task-list-column">
    <div class="task-list-column__heading">
      <h3 class="task-list-column__title">
        {{ columnTitle }}
      </h3>
    </div>

    <div
      ref="listElement"
      class="task-list-column__list"
    >
      <TaskListCard
        v-for="task in props.taskList"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.task-list-column
  display: flex
  flex-direction: column
  width: calc(100% / 3)
  background-color: $secondary-50
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
  -moz-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.25)
  border-radius: 12px

  &__heading
    background-color: $primary-400
    padding: 16px
    border-radius: 12px 12px 0 0

  &__title
    font-weight: 600
    font-size: 18px
    color: $white

  &__list
    display: flex
    flex-direction: column
    height: 100%
    row-gap: 16px
    padding: 16px
</style>
