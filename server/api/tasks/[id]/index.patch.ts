import { taskService } from '@/server/services';
import type { ResponseTaskType } from '@/types';

export default defineEventHandler(async (event): Promise<ResponseTaskType | void> => {
  const taskId: string | undefined = getRouterParam(event, 'id');

  if (!taskId) {
    return setResponseStatus(event, 400);
  }

  const body = await readBody(event);
  const task: ResponseTaskType | undefined = taskService.updateTask(taskId, body);

  if (!task) {
    return setResponseStatus(event, 404);
  }

  return task;
});
