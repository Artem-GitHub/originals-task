import type {
  DatabaseInterface,
  TaskModelType,
  TaskModelPatchType,
  TaskType,
  TaskListType,
} from '@/types';

export default class TaskService {
  private databaseService: DatabaseInterface;

  constructor(databaseService: DatabaseInterface) {
    this.databaseService = databaseService;
  }

  public getAll (): TaskListType {
    return this.databaseService.getAll<TaskType>();
  };

  public getById (id: string): TaskType | undefined {
    return this.databaseService.getById<TaskType>(id);
  };

  public create (payload: TaskModelType): TaskModelType {
    return this.databaseService.create<TaskModelType>(payload);
  };

  public update (id: string, payload: TaskModelPatchType): TaskType | undefined {
    return this.databaseService.update<TaskModelPatchType, TaskType>(id, payload);
  };

  public delete (id: string): TaskType | undefined {
    return this.databaseService.delete<TaskType>(id);
  };
};
