interface HasIdType {
  id: string;
};

interface DatabaseInterface {
  getAll<R> (): Array<R>;
  getById<R extends HasIdType> (id: string): R | undefined;
  create<M> (payload: M): M;
  update<M, R extends HasIdType> (id: string, payload: M): R | undefined;
  delete<R extends HasIdType> (id: string): R | undefined;
};

type TaskModelType = {
  id?: string,
  title: string;
  description: string | null;
  author: string;
  performer: string | null;
  status: string;
  priority: string;
};

type TaskModelPatchType = Partial<TaskModelType>;
type ResponseTaskType = TaskModelType & { id: string };
type ResponseTaskListType = Array<ResponseTaskType>;

export enum Status {
  todo = 'todo',
  progress = 'progress',
  done = 'done',
};

export enum Priority {
  low = 'low',
  medium = 'medium',
  hight = 'hight',
};

type SelectValueType = { [key: string]: string } | null;
type SelectOptionsType = Array<Exclude<SelectValueType, null>>;

export type {
  HasIdType,
  DatabaseInterface,
  TaskModelType,
  TaskModelPatchType,
  ResponseTaskType,
  ResponseTaskListType,
  SelectValueType,
  SelectOptionsType,
};
