import FetchApi from '@/api';
import type { ResponseUserListType } from '@/types';

export default class UserService extends FetchApi {
  private RESOURCE = '/user';

  public getAll (): Promise<ResponseUserListType> {
    return this.call<ResponseUserListType>('GET', `${this.RESOURCE}`);
  };
};
