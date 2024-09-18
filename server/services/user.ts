import type {
  DatabaseInterface,
  UserType,
  UserListType,
} from '@/types';

export default class UserService {
  private databaseService: DatabaseInterface;

  constructor(databaseService: DatabaseInterface) {
    this.databaseService = databaseService;
  }

  public getAll (): UserListType {
    return this.databaseService.getAll<UserType>();
  };

  public getById (id: string): UserType | undefined {
    return this.databaseService.getById<UserType>(id);
  };
};
