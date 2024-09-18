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
  authorId: string | null;
  performerId: string | null;
  status: string;
  priority: string;
};

type TaskModelPatchType = Partial<TaskModelType>;
type TaskType = TaskModelType & { id: string };
type TaskListType = Array<TaskType>;
type UserType = { name: string, id: string };
type UserListType = Array<UserType>;

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

type ModalStateType = {
  isShowTaskCreateModal: boolean;
  isShowTaskEditModal: boolean;
  isShowConfirmModal: boolean;
};

export type {
  HasIdType,
  DatabaseInterface,
  TaskModelType,
  TaskModelPatchType,
  TaskType,
  TaskListType,
  UserType,
  UserListType,
  SelectValueType,
  SelectOptionsType,
  ModalStateType,
};
