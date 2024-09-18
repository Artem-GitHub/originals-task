import { taskService } from '@/server/services';
import type { TaskType } from '@/types';

export default defineEventHandler((event) => {
  const taskId: string | undefined = getRouterParam(event, 'id');

  if (!taskId) {
    return setResponseStatus(event, 400);
  }

  const task: TaskType | undefined = taskService.delete(taskId);

  if (!task) {
    return setResponseStatus(event, 404);
  }

  return task;
});
