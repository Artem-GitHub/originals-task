<script lang="ts" setup>
import type { Form } from 'vee-validate';

import type {
  TaskModelType,
  ResponseUserListType,
  ResponseUserType,
} from '@/types';

import { Status, Priority } from '@/types';

const userStore = useUserStore();
const taskStore = useTaskStore();

const isShowModal = ref<boolean>(false);
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
const selectedUser = ref<ResponseUserType | null>(null);

const usersList = computed<ResponseUserListType>(() => userStore.usersList);

watch(
  () => selectedUser.value,
  (newValue) => {
    if (newValue) {
      taskForm.performerId = newValue.id;
    }
  }
);

// TODO: remove this mounted
onMounted(() => {
  userStore.getAllUsers();
  taskStore.getAllTasks();
});

function openModal (): void {
  isShowModal.value = true;
};

function resetTaskForm (): void {
  selectedUser.value = null;
  taskForm.title = '';
  taskForm.description = '';
  taskForm.performerId = null;
  taskForm.status = Status.todo;
  taskForm.priority = Priority.low;
};

async function submitForm (): Promise<void> {
  if (formElement.value) {
    const { validate, resetForm } = formElement.value;

    const response = await validate();
    const isValid: boolean = response.valid;

    if (isValid) {
      try {
        await taskStore.createTask({ ...taskForm });
        // TODO: show success alert
      } catch (error) {
        // TODO: show error alert
        console.error(error);
      } finally {
        resetTaskForm();
        resetForm();
        isShowModal.value = false;
      }
    }
  }
};

defineExpose({ openModal });
</script>

<template>
  <BaseModal
    v-model="isShowModal"
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
          v-model="selectedUser"
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
        <BaseButton @click="submitForm">
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
    justify-content: flex-end
</style>
