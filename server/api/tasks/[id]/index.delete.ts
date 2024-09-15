import { taskService } from '@/server/services';
import type { ResponseTaskType } from '@/types';

export default defineEventHandler((event): ResponseTaskType | void => {
  const taskId: string | undefined = getRouterParam(event, 'id');

  if (!taskId) {
    return setResponseStatus(event, 400);
  }

  const task: ResponseTaskType | undefined = taskService.deleteTask(taskId);

  if (!task) {
    return setResponseStatus(event, 404);
  }

  return task;
});
