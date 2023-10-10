import express from "express";
import * as userController from "../controllers/user.controller";
import {
  checkDataIsEmpty,
  checkDuplicateEmail,
} from "../middlewares/user.middleware";

const userRouter = express.Router();

// API lấy thông tin, tìm kiếm và phân trang
userRouter.get("/", userController.searchAndPaging);

// Thêm mới user
userRouter.post(
  "/",
  checkDataIsEmpty,
  checkDuplicateEmail,
  userController.create
);

export default userRouter;
