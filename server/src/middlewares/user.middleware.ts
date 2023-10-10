// Kiểm tra dữ liệu đầu vào cho các trường không được để trống
// Kiểm tra định dạng email
// Email không được phép trùng

import { NextFunction, Request, Response } from "express";
import { handleReponseData } from "../utils/handleResponse";
import { validateEmail } from "../utils/commonFunc";
import * as userService from "../services/user.service";

export const checkDataIsEmpty = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { UserName, DateOfBirth, Email, Passwords, ClassId } = req.body;
  if (!UserName) {
    return handleReponseData(res, null, 400, "", "Tên không được để trống.");
  }

  if (!DateOfBirth) {
    return handleReponseData(
      res,
      null,
      400,
      "",
      "Ngày sinh không được để trống."
    );
  }

  if (!Email) {
    return handleReponseData(res, null, 400, "", "Email không được để trống.");
  }

  if (!Passwords) {
    return handleReponseData(
      res,
      null,
      400,
      "",
      "Mật khẩu không được để trống."
    );
  }

  if (!ClassId) {
    return handleReponseData(
      res,
      null,
      400,
      "",
      "Tên lớp không được để trống."
    );
  }

  if (!validateEmail(Email)) {
    return handleReponseData(res, null, 400, "", "Email không đúng định dạng.");
  }

  next();
};

// Kiểm tra trùng email
export const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Email } = req.body;
  const isEmail: any = await userService.findUserByEmail(res, Email);

  if (!Array.isArray(isEmail)) {
    throw new Error("Lỗi hệ thông.");
  }

  if (isEmail[0].length > 0) {
    return handleReponseData(res, null, 400, "", "Email đã tồn tại.");
  }

  next();
};
