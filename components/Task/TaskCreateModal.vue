<script lang="ts" setup>
import type { Form } from 'vee-validate';
import type { FetchError } from 'ofetch';

import type {
  TaskModelType,
  UserListType,
  UserType,
} from '@/types';

import { Status, Priority } from '@/types';

const { $toast } = useNuxtApp();

const appStore = useAppStore();
const userStore = useUserStore();
const taskStore = useTaskStore();

const formElement = ref<typeof Form | null>(null);
const taskForm = reactive<TaskModelType>({
  title: '',
  description: '',
  authorId: '1',
  performerId: null,
  status: Status.todo,
  priority: Priority.low,
});

const statusesList: Array<string> = Object.values(Status);
const prioritiesList: Array<string> = Object.values(Priority);
const selectedAuthor = ref<UserType | null>(null);
const selectedPerformer = ref<UserType | null>(null);
const usersList = computed<UserListType>(() => userStore.usersList);
const isLoading = ref<boolean>(false);

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
  appStore.toggleModalVisibility('isShowTaskCreateModal', false);
};

function resetTaskForm (): void {
  taskForm.title = '';
  taskForm.description = '';
  taskForm.performerId = null;
  taskForm.status = Status.todo;
  taskForm.priority = Priority.low;
  selectedAuthor.value = null;
  selectedPerformer.value = null;
};

async function submitForm (): Promise<void> {
  if (formElement.value) {
    const { validate, resetForm } = formElement.value;

    const response = await validate();
    const isValid: boolean = response.valid;

    if (isValid) {
      isLoading.value = true;

      try {
        await taskStore.createTask({ ...taskForm });
        $toast.success('Task created successfully');
      } catch (error) {
        const err = error as FetchError;
        $toast.error(err?.response?.statusText || 'Unknown error');
      } finally {
        isLoading.value = false;
        resetTaskForm();
        resetForm();
        closeModal();
      }
    }
  }
};
</script>

<template>
  <BaseModal
    v-model="appStore.modal.isShowTaskCreateModal"
    @on-close="resetTaskForm"
  >
    <template #title>
      <div>Create new task</div>
    </template>

    <template #body>
      <Form
        ref="formElement"
        class="task-form"
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
      <div class="task-form__actions">
        <BaseButton
          button-style="text"
          @click="closeModal"
        >
          Cancel
        </BaseButton>

        <BaseButton
          :loading="isLoading"
          @click="submitForm"
        >
          Create
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="sass" scoped>
.task-form
  display: flex
  flex-direction: column
  row-gap: 24px

  &__actions
    display: flex
    align-items: center
    justify-content: space-between
</style>
