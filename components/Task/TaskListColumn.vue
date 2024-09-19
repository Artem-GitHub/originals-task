<script lang="ts" setup>
import Sortable from 'sortablejs';
import type { SortableEvent } from 'sortablejs';
import type { Status, TaskListType } from '@/types';

const props = defineProps<{
  listType: Status,
  columnTitle: string,
  taskList: TaskListType,
}>();

const listElement = ref<HTMLElement | null>(null);
const taskStore = useTaskStore();

onMounted(() => {
  if (listElement.value) {
    createSortable(listElement.value);
  }
});

async function changeTaskStatus (event: SortableEvent): Promise<void> {
  const { item, from, to } = event;
  const taskId: string = item.id;
  const oldStatus = from.id;
  const newStatus = to.id;

  taskStore.setTaskStatus(taskId, newStatus);

  try {
    await taskStore.updateTask(taskId, { status: newStatus });
  } catch (error) {
    // TODO: show error alert
    console.error(error);
    taskStore.setTaskStatus(taskId, oldStatus);
  }
};

function createSortable (element: HTMLElement): void {
  new Sortable(element, {
    group: 'tasks',
    animation: 500,
    onAdd: (event: SortableEvent) => {
      changeTaskStatus(event);
    },
  });
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
      :id="props.listType"
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
  align-self: flex-start

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
    row-gap: 16px
    padding: 16px

.sortable-ghost
  opacity: 0.5
</style>
