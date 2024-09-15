import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { HasIdType, DatabaseInterface } from '@/types';

export default class DatabaseService implements DatabaseInterface {
  private filePath: string;

  constructor (fileName: string) {
    this.filePath = join(process.cwd(), `server/db/${fileName}`);
  };

  private readData (): string {
    const data: string = readFileSync(this.filePath, 'utf-8');
    return data;
  };

  private saveData<R> (data: Array<R>): void {
    writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  };

  public getAll<R> (): Array<R> {
    const data: string = this.readData();

    return JSON.parse(data);
  };

  public getById<R extends HasIdType> (id: string): R | undefined {
    const data: Array<R> = this.getAll<R>();
    const findItem: R | undefined = data.find((item) => item.id === id);

    return findItem;
  };

  public create<M> (payload: M): M {
    const data: Array<M> = this.getAll<M>();

    const newPayload: M = { ...payload };
    data.push(newPayload);
    this.saveData<M>(data);

    return newPayload;
  };

  public update<M, R extends HasIdType> (id: string, payload: M): R | undefined{
    const item: R | undefined = this.getById<R>(id);

    if (item) {
      const data: Array<R> = this.getAll<R>();
      const resultData: Array<R> = data.map((item: R) => {
        if (item.id === id) {
          return { ...item, ...payload }
        } else {
          return item;
        }
      });

      this.saveData<R>(resultData);
    }

    return item;
  };

  public delete<R extends HasIdType> (id: string): R | undefined {
    const item: R | undefined = this.getById<R>(id);

    if (item) {
      const data: Array<R> = this.getAll<R>();
      const resultdata: Array<R> = data.filter((item: R) => item.id !== id);

      this.saveData<R>(resultdata);
    }

    return item;
  };
};
