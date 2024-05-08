import Express from "express";
import { MovieService } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();
router.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await MovieService.findId(movieId);
    // 响应：服务器的接口的相应格式往往是一种标准格式
    ResponseHelper.success(movie, res);
  } catch (error) {
    console.log("error：", error);
    ResponseHelper.success(null, res);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await MovieService.find(req.query as any);
    ResponseHelper.pageData(result, res);
  } catch (error) {
    console.log("error：", error);
    ResponseHelper.success(null, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await MovieService.add(req.body);
    if (Array.isArray(result)) {
      ResponseHelper.fail(result, res);
    } else {
      ResponseHelper.success(result, res);
    }
  } catch (error) {
    console.log("error：", error);
    ResponseHelper.success(null, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await MovieService.edit(req.params.id, req.body);
    if (result.length > 0) {
      ResponseHelper.fail(result, res);
    } else {
      ResponseHelper.success(null, res, "修改成功");
    }
  } catch (error) {
    console.log("error：", error);
    ResponseHelper.success(null, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await MovieService.delete(req.params.id);
    ResponseHelper.success(result, res, "删除成功");
  } catch (error) {
    console.log("error：", error);
    ResponseHelper.success(null, res);
  }
});

export default router;
