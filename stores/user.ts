import { userService } from '@/services';
import type { UserType, UserListType } from '@/types';

export const useUserStore = defineStore('user', {
  state: () => ({
    usersList: [] as UserListType,
  }),

  actions: {
    setUsersList (data: UserListType) {
      if (Array.isArray(data)) {
        this.usersList = [...data];
      }
    },

    async getAllUsers (): Promise<UserListType | undefined> {
      try {
        const response: UserListType = await userService.getAll();
        this.usersList = response;
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    async getUserById (id: string): Promise<UserType | undefined> {
      try {
        const response: UserType = await userService.getById(id);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
