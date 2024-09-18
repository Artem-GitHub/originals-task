import { userService } from '@/server/services';
import type { UserListType } from '@/types';

export default defineEventHandler((): UserListType => {
  return userService.getAll();
});
