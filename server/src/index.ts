// 验证：class-validator
import "reflect-metadata";
import { MovieService } from "./services/MovieService";
import { Movie } from "./entities/Movie";
const m: any = {
  name: "流浪地球",
};

function getRandom(min: number, max: number) {
  const dec = max - min;
  return Math.floor(Math.random() * dec + min);
}

// for (let index = 0; index < 100; index++) {
//   const m = new Movie();
//   m.name = `电影${index + 1}`;
//   m.types = ["动作", "科幻"];
//   m.areas = ["中国"];
//   m.isClasic = true;
//   m.timeLong = getRandom(60, 180);

//   MovieService.add(m).then((result) => {
//     if (Array.isArray(result)) {
//       console.log("err", result);
//     } else {
//       console.log("result", result);
//     }
//   });
// }

// MovieService.edit("6638debd3c674670dca922cb", m).then((result) => {
//   console.log("result", result);
// });

// MovieService.delete("6638df65378ec2c9159d543d").then((result) => {
//   console.log("删除成功");
// });

// MovieService.findId("6638debd3c674670dca922cb").then((result) => {
//   console.log("result", result);
// });

const param: any = { key: "电影", page: 2, limit: 5 };
MovieService.find(param).then((res) => {
  if (res.errors.length > 0) {
    console.log(res.errors);
  } else {
    console.log(res.data.map((item) => item.name));
  }
});
