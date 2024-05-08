import { IMovie } from "../db/MovieSchema";
import { MovieModel } from "../db/db";
import { ISearchResult } from "../entities/CommonTypes";
import { Movie } from "../entities/Movie";
import { SearchCondition } from "../entities/SearchCondition";

export class MovieService {
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 转换类型 需要将 plain object 转换为 class object
    movie = Movie.transform(movie);
    // 数据验证
    const errors = await movie.validateThis();
    if (errors.length > 0) {
      return errors;
    }
    // 添加到数据库
    return await MovieModel.create(movie);
  }

  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 转换类型 需要将 plain object 转换为 class object
    const movieObj = Movie.transform(movie);
    // 数据验证
    const errors = await movieObj.validateThis(true);
    if (errors.length > 0) {
      return errors;
    }
    // 修改数据库
    await MovieModel.updateOne({ _id: id }, movie);
    return [];
  }

  public static async delete(id: string) {
    return await MovieModel.deleteOne({ _id: id });
  }

  public static async findId(id: string): Promise<IMovie | null> {
    return await MovieModel.findById(id);
  }

  /**
   * 条件查询
   * @param condition page limit key
   */
  public static async find(
    condition: SearchCondition
  ): Promise<ISearchResult<IMovie>> {
    // 转换类型 需要将 plain object 转换为 class object
    const conditionObj = SearchCondition.transform(condition);
    // 数据验证
    const errors = await conditionObj.validateThis();
    if (errors.length > 0) {
      return { count: 0, data: [], errors };
    }

    // 查询数据库
    const movies = await MovieModel.find({
      name: { $regex: new RegExp(conditionObj.key) },
    })
      .skip((conditionObj.page - 1) * conditionObj.limit)
      .limit(conditionObj.limit);
    const count = await MovieModel.countDocuments();

    return { count, data: movies, errors };
  }
}
