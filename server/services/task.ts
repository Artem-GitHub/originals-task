import type {
  DatabaseInterface,
  TaskModelType,
  TaskModelPatchType,
  ResponseTaskType,
  ResponseTaskListType,
} from '@/types';

export default class TaskService {
  private databaseService: DatabaseInterface;

  constructor(databaseService: DatabaseInterface) {
    this.databaseService = databaseService;
  }

  public getAllTasks (): ResponseTaskListType {
    return this.databaseService.getAll<ResponseTaskType>();
  };

  public getTaskById (id: string): ResponseTaskType | undefined {
    return this.databaseService.getById<ResponseTaskType>(id);
  };

  public createTask (payload: TaskModelType): TaskModelType {
    return this.databaseService.create<TaskModelType>(payload);
  };

  public updateTask (id: string, payload: TaskModelPatchType): ResponseTaskType | undefined {
    return this.databaseService.update<TaskModelPatchType, ResponseTaskType>(id, payload);
  };

  public deleteTask (id: string): ResponseTaskType | undefined {
    return this.databaseService.delete<ResponseTaskType>(id);
  };
};
