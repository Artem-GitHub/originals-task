import { taskService } from '@/services';

import type {
  TaskModelType,
  TaskType,
  TaskListType,
} from '@/types';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasksList: [] as TaskListType,
  }),

  actions: {
    setTasksList (data: TaskListType): void {
      if (Array.isArray(data)) {
        this.tasksList = [...data];
      }
    },

    addTaskToList (data: TaskType) {
      this.tasksList.push({ ...data });
    },

    async getAllTasks (): Promise<TaskListType | undefined> {
      try {
        const response: TaskListType = await taskService.getAll();

        this.setTasksList(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    async createTask (payload: TaskModelType): Promise<TaskType | undefined> {
      try {
        const response: TaskType = await taskService.create(payload);

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
