import FetchApi from '@/api';
import type { ResponseUserType, ResponseUserListType } from '@/types';

export default class UserService extends FetchApi {
  private RESOURCE = '/user';

  public getAll (): Promise<ResponseUserListType> {
    return this.call<ResponseUserListType>('GET', `${this.RESOURCE}`);
  };

  public getById (id: string): Promise<ResponseUserType> {
    return this.call<ResponseUserType>('GET', `${this.RESOURCE}/${id}`);
  };
};
