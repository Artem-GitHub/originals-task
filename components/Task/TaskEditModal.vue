<script lang="ts" setup>
import type { Form } from 'vee-validate';
import type { FetchError } from 'ofetch';

import type {
  TaskModelType,
  TaskType,
  UserListType,
  UserType,
} from '@/types';

import { Status, Priority } from '@/types';

const appStore = useAppStore();
const taskStore = useTaskStore();
const userStore = useUserStore();

const { $toast } = useNuxtApp();

const formElement = ref<typeof Form | null>(null);
const taskForm = reactive<TaskModelType>({
  title: '',
  description: '',
  authorId: null,
  performerId: null,
  status: Status.todo,
  priority: Priority.low,
});
const task = ref<TaskType | null | undefined>(null);
const isLoadingTaskData = ref<boolean>(true);

const statusesList: Array<string> = Object.values(Status);
const prioritiesList: Array<string> = Object.values(Priority);
const selectedAuthor = ref<UserType | null>(null);
const selectedPerformer = ref<UserType | null>(null);
const usersList = computed<UserListType>(() => userStore.usersList);

watch(
  () => selectedAuthor.value,
  (newValue) => {
    if (newValue) {
      taskForm.authorId = newValue.id;
    }
  }
);

watch(
  () => selectedPerformer.value,
  (newValue) => {
    if (newValue) {
      taskForm.performerId = newValue.id;
    }
  }
);

function closeModal (): void {
  appStore.toggleModalVisibility('isShowTaskEditModal', false);
};

function openConfirmModal (): void {
  appStore.toggleModalVisibility('isShowConfirmModal', true);
};

function closeConfirmModal (): void {
  appStore.toggleModalVisibility('isShowConfirmModal', false);
};

function onOpenModal (): void {
  if (taskStore.taskEditId) {
    getTask(taskStore.taskEditId);
  } else {
    closeModal();
  }
};

function onCloseModal (): void {
  resetTaskForm();
  selectedAuthor.value = null;
  selectedPerformer.value = null;
  task.value = null;
  taskStore.taskEditId = null;
  isLoadingTaskData.value = true;
};

function setTaskFormData (taskData: TaskType): void {
  taskForm.title = taskData.title;
  taskForm.description = taskData.description;
  taskForm.authorId = taskData.authorId;
  taskForm.performerId = taskData.performerId;
  taskForm.status = taskData.status;
  taskForm.priority = taskData.priority;
};

function setSelectsValues ({ authorId, performerId }: TaskType): void {
  const findAuthor = usersList.value.find((user) => user.id === authorId);
  const findPerformer = usersList.value.find((user) => user.id === performerId);

  if (findAuthor) {
    selectedAuthor.value = findAuthor;
  }

  if (findPerformer) {
    selectedPerformer.value = findPerformer;
  }
};

function resetTaskForm (): void {
  taskForm.title = '';
  taskForm.description = '';
  taskForm.authorId = null;
  taskForm.performerId = null;
  taskForm.status = Status.todo;
  taskForm.priority = Priority.low;
  selectedAuthor.value = null;
  selectedPerformer.value = null;
};

async function getTask (id: string): Promise<void> {
  try {
    task.value = await taskStore.getTaskById(id);

    if (task.value) {
      setTaskFormData(task.value);
      setSelectsValues(task.value);
      isLoadingTaskData.value = false;
    } else {
      throw new Error;
    }
  } catch (error) {
    const err = error as FetchError;
    $toast.error(err?.response?.statusText || 'Unknown error');
    closeModal();
  }
};

async function submitForm (): Promise<void> {
  if (formElement.value) {
    const { validate, resetForm } = formElement.value;

    const response = await validate();
    const isValid: boolean = response.valid;

    if (isValid && task.value) {
      try {
        await taskStore.updateTask(task.value.id, { ...taskForm });
        $toast.success('Task edited successfully');
      } catch (error) {
        const err = error as FetchError;
        $toast.error(err?.response?.statusText || 'Unknown error');
      } finally {
        resetForm();
        closeModal();
      }
    }
  }
};

async function deleteTask (): Promise<void> {
  if (task.value) {
    try {
      await taskStore.deleteTask(task.value.id);
      $toast.success('Task deleted successfully');
    } catch (error) {
      const err = error as FetchError;
      $toast.error(err?.response?.statusText || 'Unknown error');
    } finally {
      closeConfirmModal();
      closeModal();
    }
  }
};
</script>

<template>
  <BaseModal
    v-model="appStore.modal.isShowTaskEditModal"
    class="task-edit-modal"
    :is-loading="isLoadingTaskData"
    @on-open="onOpenModal"
    @on-close="onCloseModal"
  >
    <template #title>
      <div>Edit {{ task?.title }}</div>
    </template>

    <template #body>
      <Form
        ref="formElement"
        class="task-edit-modal__form"
      >
        <BaseInput
          v-model="taskForm.title"
          name="title"
          placeholder="Enter title"
          label="Enter task title"
          :rules="'required|max:50'"
          validate-on-input
        />

        <BaseTextarea
          v-model="taskForm.description"
          name="description"
          placeholder="Enter description"
          label="Enter task description"
          :rules="'max:500'"
          validate-on-input
        />

        <BaseSelect
          v-model="selectedAuthor"
          :options="usersList"
          track-by="id"
          select-label="name"
          placeholder="Select author"
          label="Author"
        />

        <BaseSelect
          v-model="selectedPerformer"
          :options="usersList"
          track-by="id"
          select-label="name"
          placeholder="Select performer"
          label="Performer"
        />

        <BaseSelect
          v-model="taskForm.status"
          :options="statusesList"
          placeholder="Select status"
          label="Status"
        />

        <BaseSelect
          v-model="taskForm.priority"
          :options="prioritiesList"
          placeholder="Select priority"
          label="Priority"
        />
      </Form>
    </template>

    <template #footer>
      <div class="task-edit-modal__actions">
        <BaseButton
          button-style="text"
          @click="closeModal"
        >
          Cancel
        </BaseButton>

        <div class="task-edit-modal__actions-main">
          <BaseButton @click="openConfirmModal">
            Delete
          </BaseButton>

          <BaseButton @click="submitForm">
            Save
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>

  <BaseConfirmModal
    :title="`Delete ${task?.title ? task.title : ''}`"
    :text="`Are you sure you want to delete ${task?.title ? task.title : ''}?`"
    @on-cancel="closeConfirmModal"
    @on-confirm="deleteTask"
  />
</template>

<style lang="sass" scoped>
.task-edit-modal
  &__form
    display: flex
    flex-direction: column
    row-gap: 24px

  &__actions
    display: flex
    align-items: center
    justify-content: space-between

  &__actions-main
    display: flex
    align-items: center
    column-gap: 24px
</style>
