// 验证：class-validator
import "reflect-metadata";
import { MovieService } from "./services/MovieService";
const m: any = {
  name: "流浪地球",
};

// MovieService.add(m).then((result) => {
//   if (Array.isArray(result)) {
//     console.log("err", result);
//   } else {
//     console.log("result", result);
//   }
// });

// MovieService.edit("6638debd3c674670dca922cb", m).then((result) => {
//   console.log("result", result);
// });

// MovieService.delete("6638df65378ec2c9159d543d").then((result) => {
//   console.log("删除成功");
// });

MovieService.findId("6638debd3c674670dca922cb").then((result) => {
  console.log("result", result);
});
