import { IMovie } from "../db/MovieSchema";
import { MovieModel } from "../db/db";
import { Movie } from "../entities/Movie";

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

  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({ _id: id });
  }

  public static async findId(id: string): Promise<IMovie | null> {
    return await MovieModel.findById(id);
  }
}
