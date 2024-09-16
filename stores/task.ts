import type {
  TaskModelType,
  ResponseTaskType,
  ResponseTaskListType,
} from '@/types';

const { $taskService } = useNuxtApp();

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasksList: [] as ResponseTaskListType,
  }),

  actions: {
    setTasksList (data: ResponseTaskListType): void {
      if (Array.isArray(data)) {
        this.tasksList = [...data];
      }
    },

    addTaskToList (data: ResponseTaskType) {
      this.tasksList.push({ ...data });
    },

    async getAllTasks (): Promise<ResponseTaskListType | undefined> {
      try {
        const response: ResponseTaskListType = await $taskService.getAll();

        this.setTasksList(response);
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    async createTask (payload: TaskModelType): Promise<ResponseTaskType | undefined> {
      try {
        const response: ResponseTaskType = await $taskService.create(payload);

        if (response) {
          this.addTaskToList(response);
        }

        console.log(this.tasksList);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
