import FetchApi from '@/api';
import type {
  TaskModelType,
  TaskModelPatchType,
  TaskType,
  TaskListType,
} from '@/types';

export default class TaskService extends FetchApi {
  private RESOURCE = '/task';

  public getAll (): Promise<TaskListType> {
    return this.call<TaskListType>('GET', `${this.RESOURCE}`);
  };

  public getById (id: string): Promise<TaskType> {
    return this.call<TaskType>('GET', `${this.RESOURCE}/${id}`);
  };

  public create (payload: TaskModelType): Promise<TaskType> {
    return this.call<TaskType>('POST', `${this.RESOURCE}/create`, payload);
  };

  public update (id: string, payload: TaskModelPatchType): Promise<TaskType> {
    return this.call<TaskType>('PATCH', `${this.RESOURCE}/${id}`, payload);
  };

  public delete (id: string): Promise<TaskType> {
    return this.call<TaskType>('DELETE', `${this.RESOURCE}/${id}`);
  };
};
