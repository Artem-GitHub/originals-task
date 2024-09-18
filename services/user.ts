import FetchApi from '@/api';
import type { UserType, UserListType } from '@/types';

export default class UserService extends FetchApi {
  private RESOURCE = '/user';

  public getAll (): Promise<UserListType> {
    return this.call<UserListType>('GET', `${this.RESOURCE}`);
  };

  public getById (id: string): Promise<UserType> {
    return this.call<UserType>('GET', `${this.RESOURCE}/${id}`);
  };
};
