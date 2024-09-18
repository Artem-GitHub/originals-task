import { taskService } from '@/server/services';
import type { TaskType } from '@/types';

export default defineEventHandler(async (event) => {
  const taskId: string | undefined = getRouterParam(event, 'id');

  if (!taskId) {
    return setResponseStatus(event, 400);
  }

  const body = await readBody(event);
  const task: TaskType | undefined = taskService.update(taskId, body);

  if (!task) {
    return setResponseStatus(event, 404);
  }

  return task;
});
