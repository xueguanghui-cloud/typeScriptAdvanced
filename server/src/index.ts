// 验证：class-validator
import "reflect-metadata";
import MovieRouter from "./routes/MovieRoute";
import Express from "express";
import UploadRouter from "./routes/UploadRoute";
const app = Express();

app.use(Express.json()); // 配置中间件，用于解析json格式的请求体

// 配置路由
app.use("/api/movie", MovieRouter);

// 文件上传
app.use("/api/upload", UploadRouter);

// 配置静态资源
app.use("/uploads", Express.static("uploads/"));

app.listen(3000, () => {
  console.log("server is running：http://127.0.0.1:3000");
});
