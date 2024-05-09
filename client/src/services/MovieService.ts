import axios from "axios";
import { IResponseError, IResponseSuccess } from "./CommonTypes";

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
  imit?: number;
  key?: string;
}

export class MovieService {
  /**
   * 添加电影
   * @param movie
   * @returns
   */
  public static async add(
    movie: IMovie
  ): Promise<IResponseSuccess<IMovie> | IResponseError> {
    const { data } = await axios.post("/api/movie", movie);
    return data;
  }

  /**
   * 修改电影
   * @param id
   * @returns
   */
  public static async edit(
    id: string,
    movie: IMovie
  ): Promise<IResponseSuccess<true> | IResponseError> {
    const { data } = await axios.put(`/api/movie/${id}`, movie);
    return data;
  }

  /**
   * 删除电影
   * @param id
   * @returns
   */
  public static async delete(
    id: string
  ): Promise<IResponseSuccess<IDeleteResult> | null> {
    const { data } = await axios.delete(`/api/movie/${id}`);
    return data;
  }

  /**
   * 根据Id查找电影
   * @param id
   * @returns
   */
  public static async getMovieById(id: string): Promise<IMovie | null> {
    const { data } = await axios.get(`/api/movie/${id}`);
    return data;
  }

  /**
   * 查找电影
   * @param id
   * @returns
   */
  public static async getMovies(
    condition: ISearchCondition
  ): Promise<IResponseSuccess<IMovie[]> | null> {
    const { data } = await axios.get("/api/movie", {
      params: condition,
    });
    return data;
  }
}
