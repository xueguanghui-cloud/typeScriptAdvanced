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

export interface IMovie {
  _id?: string;
  name: string;
  types: string[];
  areas: string[];
  timeLong: number;
  isHot: boolean;
  isComing: boolean;
  isClasic: boolean;
  description?: string;
  poster?: string;
}

export interface IDeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}

export interface ISearchCondition {
  page?: number;
  limit?: number;
  key?: string;
}

export enum SwitchType {
  Hot = "isHot",
  Coming = "isComing",
  Classic = "isClasic",
}

export interface IMovieChangeSwitch {
  id: string;
  type: SwitchType;
  newValue: boolean;
}
