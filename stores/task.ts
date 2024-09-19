import { taskService } from '@/services';

import type {
  TaskModelType,
  TaskModelPatchType,
  TaskType,
  TaskListType,
} from '@/types';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasksList: [] as TaskListType,
    taskEditId: null as string | null,
  }),

  actions: {
    setTasksList (data: TaskListType): void {
      if (Array.isArray(data)) {
        this.tasksList = [...data];
      }
    },

    addTaskToList (data: TaskType): void {
      this.tasksList.push({ ...data });
    },

    updateTaskInList (data: TaskType): void {
      const findTaskIndex = this.tasksList.findIndex((task) => task.id === data.id);
      this.tasksList.splice(findTaskIndex, 1, data);
    },

    deleteTaskFromList (id: string): void {
      const findTaskIndex = this.tasksList.findIndex((task) => task.id === id);
      this.tasksList.splice(findTaskIndex, 1);
    },

    setTaskStatus (id: string, status: string): void {
      const findTask = this.tasksList.find((task) => task.id === id);

      if (findTask) {
        findTask.status = status;
      }
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

    async getTaskById (id: string): Promise<TaskType | undefined> {
      try {
        const response: TaskType = await taskService.getById(id);
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

    async updateTask (id: string, payload: TaskModelPatchType): Promise<TaskType | undefined> {
      try {
        const response: TaskType = await taskService.update(id, payload);

        if (response) {
          this.updateTaskInList(response);
        }

        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async deleteTask (id: string): Promise<TaskType | undefined> {
      try {
        const response: TaskType = await taskService.delete(id);

        if (response) {
          this.deleteTaskFromList(response.id);
        }

        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
