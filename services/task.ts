import FetchApi from '@/api';
import type {
  TaskModelType,
  TaskModelPatchType,
  ResponseTaskType,
  ResponseTaskListType,
} from '@/types';

export default class TaskService extends FetchApi {
  private RESOURCE = '/task';

  public getAll (): Promise<ResponseTaskListType> {
    return this.call<ResponseTaskListType>('GET', `${this.RESOURCE}`);
  };

  public getById (id: string): Promise<ResponseTaskType> {
    return this.call<ResponseTaskType>('GET', `${this.RESOURCE}/${id}`);
  };

  public create (payload: TaskModelType): Promise<ResponseTaskType> {
    return this.call<ResponseTaskType>('POST', `${this.RESOURCE}/create`, payload);
  };

  public update (id: string, payload: TaskModelPatchType): Promise<ResponseTaskType> {
    return this.call<ResponseTaskType>('PATCH', `${this.RESOURCE}/${id}`, payload);
  };

  public delete (id: string): Promise<ResponseTaskType> {
    return this.call<ResponseTaskType>('DELETE', `${this.RESOURCE}/${id}`);
  };
};
