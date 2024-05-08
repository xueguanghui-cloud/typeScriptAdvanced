// 验证：class-validator
import "reflect-metadata";
import MovieRouter from "./routes/MovieRoute";
import Express from "express";
const app = Express();

app.use(Express.json()); // 配置中间件，用于解析json格式的请求体

app.use("/api/movie", MovieRouter);

app.listen(3000, () => {
  console.log("server is running：http://127.0.0.1:3000");
});
