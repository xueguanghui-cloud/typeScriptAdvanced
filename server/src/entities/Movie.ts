import { Type, plainToClass } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  Max,
  Min,
  ValidationError,
  validate,
} from "class-validator";

export class Movie {
  @IsNotEmpty({ message: "电影名称不可以为空" })
  @Type(() => String)
  public name: string;

  @IsNotEmpty({ message: "电影类型不可以为空" })
  @ArrayMinSize(1, { message: "电影类型至少一个" })
  @IsArray({ message: "电影类型必须是数组" })
  @Type(() => String)
  public types: string[];

  @IsNotEmpty({ message: "上映地区不可以为空" })
  @ArrayMinSize(1, { message: "上映地区至少一个" })
  @IsArray({ message: "上映地区必须是数组" })
  @Type(() => String)
  public areas: string[];

  @IsNotEmpty({ message: "时长不可以为空" })
  @IsInt({ message: "时长必须是整数" })
  @Min(1, { message: "时长最小1分钟" })
  @Max(99999, { message: "时长最大99999分钟" })
  @Type(() => Number)
  public timeLong: number;

  @IsNotEmpty({ message: "是否热映不可以为空" })
  @Type(() => Boolean)
  public isHot: boolean = false;

  @IsNotEmpty({ message: "是否即将上映不可以为空" })
  @Type(() => Boolean)
  public isComing: boolean = false;

  @IsNotEmpty({ message: "是否是经典影片不可以为空" })
  @Type(() => Boolean)
  public isClasic: boolean = false;

  @Type(() => String)
  public description?: string;

  @Type(() => String)
  public poster?: string;

  /**
   * 验证当前电影对象
   * @returns Promise<string[]>
   */
  public async validateThis(skipMissing = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMissing,
    });
    const temp = errors.map((error) => Object.values(error.constraints!));
    const result: string[] = [];
    temp.forEach((item) => {
      result.push(...item);
    });
    return result;
  }

  /**
   * 将平面对象转换为 Movie 对象
   * @param plainObject 平面对象
   * @returns Movie
   */
  public static transform(plainObject: object): Movie {
    if (plainObject instanceof Movie) {
      return plainObject;
    }
    return plainToClass(Movie, plainObject);
  }
}
