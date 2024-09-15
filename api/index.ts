import type { $Fetch } from 'ofetch';

export default class FetchApi {
  private fetchApi: $Fetch;

  constructor (fetch: $Fetch) {
    this.fetchApi = fetch;
  };

  call<R> (method: string, url: string, data?: object, extras = {}): Promise<R> {
    return this.fetchApi(url, { method, body: data, ...extras });
  };
};
