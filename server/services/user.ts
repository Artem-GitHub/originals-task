import type {
  DatabaseInterface,
  ResponseUserType,
  ResponseUserListType,
} from '@/types';

export default class UserService {
  private databaseService: DatabaseInterface;

  constructor(databaseService: DatabaseInterface) {
    this.databaseService = databaseService;
  }

  public getAllUsers (): ResponseUserListType {
    return this.databaseService.getAll<ResponseUserType>();
  };

  public getUserById (id: string): ResponseUserType | undefined {
    return this.databaseService.getById<ResponseUserType>(id);
  };
};
