import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";

export class ResponseHelper {
  /**
   * 响应错误
   * @param error 错误消息
   * @param res
   * @returns
   */
  public static fail(error: string | string[], res: Response) {
    error = Array.isArray(error) ? error.join(";") : error;
    res.send({
      code: 0,
      error,
      message: "操作失败",
      data: null,
    });
  }

  /**
   * 响应成功
   * @param data 返回数据
   * @param res
   */
  public static success(data: any, res: Response, message = "操作成功") {
    res.send({
      code: 1,
      error: null,
      message,
      data,
    });
  }

  /**
   * 响应分页数据
   * @param result
   * @param res
   */
  public static pageData<T>(result: ISearchResult<T>, res: Response) {
    if (result.errors.length > 0) {
      this.fail(result.errors, res);
    } else {
      res.send({
        code: 1,
        error: null,
        message: "查询成功",
        data: result.data,
        total: result.count,
      });
    }
  }
}
