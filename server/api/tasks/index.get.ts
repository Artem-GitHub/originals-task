import { taskService } from '@/server/services';
import type { ResponseTaskListType } from '@/types';

export default defineEventHandler((): ResponseTaskListType => {
  return taskService.getAllTasks();
});
