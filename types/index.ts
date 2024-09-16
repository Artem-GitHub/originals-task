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
  authorId: string;
  performerId: string | null;
  status: string;
  priority: string;
};

type TaskModelPatchType = Partial<TaskModelType>;
type ResponseTaskType = TaskModelType & { id: string };
type ResponseTaskListType = Array<ResponseTaskType>;
type ResponseUserType = { name: string, id: string };
type ResponseUserListType = Array<ResponseUserType>;

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

type SelectValueType = { [key: string]: string } | string | null;
type SelectOptionsType = Array<string>
  | Array<Extract<SelectValueType, { [key: string]: string }>>;

export type {
  HasIdType,
  DatabaseInterface,
  TaskModelType,
  TaskModelPatchType,
  ResponseTaskType,
  ResponseTaskListType,
  ResponseUserType,
  ResponseUserListType,
  SelectValueType,
  SelectOptionsType,
};
