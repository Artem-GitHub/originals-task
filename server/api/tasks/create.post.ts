import { taskService } from '@/server/services';
import { Status, Priority } from '@/types';
import type { TaskModelType } from '@/types';

export default defineEventHandler(async (event): Promise<TaskModelType | void> => {
  const body = await readBody(event);

  const payload: TaskModelType = {
    id: String(Date.now()),
    title: body.title || null,
    description: body.description || null,
    author: body.author || null,
    performer: body.performer || null,
    status: body.status || Status.todo,
    priority: body.priority || Priority.low,
  };

  if (!payload.title || !payload.author) {
    return setResponseStatus(event, 400);
  }

  setResponseStatus(event, 201);
  const task: TaskModelType = taskService.createTask(payload);
  return task;
});
