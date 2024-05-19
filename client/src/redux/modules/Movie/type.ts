import { IMovie, ISearchCondition } from "../types/CommonTypes";

// 描述电影列表的状态类型

export type TMovieCondition = Required<ISearchCondition>;

/**
 * 电影状态
 */
export interface IMovieState {
  /**
   * 电影列表
   */
  data: IMovie[];
  /**
   * 查询条件
   */
  condition: TMovieCondition;
  /**
   * 总记录数
   */
  total: number;
  /**
   * 是否正在加载
   */
  isLoading: boolean;
  /**
   * 总页数
   */
  totalPage: number;
}

export type TAction<T> = {
  type: string;
  payload: T;
};

export interface IRootState {
  movie: IMovieState;
}
