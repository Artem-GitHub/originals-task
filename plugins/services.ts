import { taskService, userService } from '@/services';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      taskService,
      userService,
    },
  };
});
