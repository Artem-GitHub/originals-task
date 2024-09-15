import { taskService } from '@/services';

export default defineNuxtPlugin(() => {
  return { provide: { taskService } };
});
