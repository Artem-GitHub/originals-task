import { userService } from '@/server/services';
import type { UserType } from '@/types';

export default defineEventHandler((event) => {
  const userId: string | undefined = getRouterParam(event, 'id');

  if (!userId) {
    return setResponseStatus(event, 400);
  }

  const user: UserType | undefined = userService.getById(userId);

  if (!user) {
    return setResponseStatus(event, 404);
  }

  return user;
});
