import { userService } from '@/server/services';
import type { ResponseUserListType } from '@/types';

export default defineEventHandler((): ResponseUserListType => {
  return userService.getAllUsers();
});
