import { taskService } from '@/server/services';
import type { TaskListType } from '@/types';

export default defineEventHandler((): TaskListType => {
  return taskService.getAll();
});
