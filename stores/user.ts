import type { ResponseUserListType } from '@/types';

const { $userService } = useNuxtApp();

export const useUserStore = defineStore('user', {
  state: () => ({
    usersList: [] as ResponseUserListType,
  }),

  actions: {
    setUsersList (data: ResponseUserListType) {
      if (Array.isArray(data)) {
        this.usersList = [...data];
      }
    },

    async getAllUsers (): Promise<ResponseUserListType | undefined> {
      try {
        const response: ResponseUserListType = await $userService.getAll();
        this.usersList = response;
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
