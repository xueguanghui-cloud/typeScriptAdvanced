import Express from "express";
import multer from "multer";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      const time = new Date().getTime();
      const extname = path.extname(file.originalname);
      cb(null, `${time}${extname}`);
    },
  }),
  limits: {
    // 限制文件大小
    fileSize: 1024 * 1024 * 1, // 1M
  },
  // 限制文件类型
  fileFilter: (req, file, cb) => {
    const mimetype = file.mimetype;
    if (mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(new Error("文件类型错误"));
    }
  },
}).single("file");

const router = Express.Router();
router.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      ResponseHelper.fail(err.message, res);
    } else {
      const url = `/uploads/${req.file?.filename}`;
      ResponseHelper.success(url, res, "上传成功");
    }
  });
});

export default router;
