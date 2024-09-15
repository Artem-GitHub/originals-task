export const useTaskStore = defineStore('task', {
  state: () => ({
    isShowTaskModal: false as boolean,
  }),

  actions: {
    toggleTaskModalVisibility (value: boolean) {
      this.isShowTaskModal = value;
    },
  },
});
