import express from "express";
import * as userController from "../controllers/user.controller";

const userRouter = express.Router();

// API lấy thông tin, tìm kiếm và phân trang
userRouter.get("/", userController.searchAndPaging);

export default userRouter;
