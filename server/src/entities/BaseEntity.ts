import { validate } from "class-validator";
import { Movie } from "./Movie";
import { ClassConstructor, plainToClass } from "class-transformer";

export abstract class BaseEntity {
  /**
   * 验证
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
   * 将平面对象转换为 class object
   * @param plainObject 平面对象
   * @returns Movie
   */
  protected static baseTransform<T>(
    cls: ClassConstructor<T>,
    plainObject: object
  ): T {
    if (plainObject instanceof cls) {
      return plainObject;
    }
    return plainToClass(cls, plainObject);
  }
}
