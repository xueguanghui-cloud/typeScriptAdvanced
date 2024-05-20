import axios from "axios";
import {
  IDeleteResult,
  IMovie,
  IPageData,
  IResponseError,
  IResponseSuccess,
  ISearchCondition,
} from "../redux/modules/types/CommonTypes";

export class MovieService {
  /**
   * 添加电影
   * @param movie
   * @returns
   */
  public static async add(movie: IMovie): Promise<IResponseSuccess<IMovie> | IResponseError> {
    const { data } = await axios.post("/api/movie", movie);
    return data;
  }

  /**
   * 修改电影
   * @param id
   * @returns
   */
  public static async edit(id: string, movie: Partial<IMovie>): Promise<IResponseSuccess<true> | IResponseError> {
    const { data } = await axios.put(`/api/movie/${id}`, movie);
    return data;
  }

  /**
   * 删除电影
   * @param id
   * @returns
   */
  public static async delete(id: string): Promise<IResponseSuccess<IDeleteResult> | null> {
    const { data } = await axios.delete(`/api/movie/${id}`);
    return data;
  }

  /**
   * 根据Id查找电影
   * @param id
   * @returns
   */
  public static async getMovieById(id: string): Promise<IResponseSuccess<IMovie | null>> {
    const { data } = await axios.get(`/api/movie/${id}`);
    return data;
  }

  /**
   * 查找电影
   * @param id
   * @returns
   */
  public static async getMovies(condition: ISearchCondition): Promise<IPageData<IMovie> | null> {
    const { data } = await axios.get("/api/movie", {
      params: condition,
    });
    return data;
  }
}
