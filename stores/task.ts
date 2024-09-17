import { taskService } from '@/services';

import type {
  TaskModelType,
  ResponseTaskType,
  ResponseTaskListType,
} from '@/types';

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
        const response: ResponseTaskListType = await taskService.getAll();

        this.setTasksList(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    async createTask (payload: TaskModelType): Promise<ResponseTaskType | undefined> {
      try {
        const response: ResponseTaskType = await taskService.create(payload);

        if (response) {
          this.addTaskToList(response);
        }

        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
