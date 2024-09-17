import { userService } from '@/server/services';
import type { ResponseUserType } from '@/types';

export default defineEventHandler((event) => {
  const userId: string | undefined = getRouterParam(event, 'id');

  if (!userId) {
    return setResponseStatus(event, 400);
  }

  const user: ResponseUserType | undefined = userService.getUserById(userId);

  if (!user) {
    return setResponseStatus(event, 404);
  }

  return user;
});
