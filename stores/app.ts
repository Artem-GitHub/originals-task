import type { ModalStateType } from '@/types';

export const useAppStore = defineStore('app', {
  state: () => ({
    modal: {
      isShowTaskCreateModal: false,
      isShowTaskEditModal: false,
      isShowConfirmModal: false,
    } as ModalStateType,
  }),

  actions: {
    toggleModalVisibility (name: keyof ModalStateType, value: boolean) {
      this.modal[name] = value;
    },
  },
});
