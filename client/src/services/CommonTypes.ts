export interface IResponseError {
  code: number;
  error: string;
  data: null;
  message: string;
}

export interface IResponseSuccess<T> {
  code: number;
  error: null;
  data: T;
  message: string;
}

export interface IPageData<T> {
  code: number;
  error: null;
  message: string;
  total: number;
  data: T[];
}
