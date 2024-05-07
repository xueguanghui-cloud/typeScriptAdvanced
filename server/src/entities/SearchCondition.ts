import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity {
  @IsInt({ message: "页码必须是整数" })
  @Min(1, { message: "页码最小为1" })
  @Type(() => Number)
  public page: number = 1;

  @IsInt({ message: "每页数量必须是整数" })
  @Min(1, { message: "每页数量最小为1" })
  @Type(() => Number)
  public limit: number = 10;

  @Type(() => String)
  public key: string = "";

  /**
   * 将平面对象转换为 SearchCondition 对象
   * @param plainObject 平面对象
   * @returns
   */
  public static transform(plainObject: object): SearchCondition {
    return super.baseTransform(SearchCondition, plainObject);
  }
}
