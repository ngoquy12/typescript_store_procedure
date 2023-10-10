import { Response } from "express";
import database from "../utils/database";
import { handleReponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { formatYMD } from "../utils/commonFunc";

/**
 * Tìm kiếm và phân trang user
 * @param keySeach : Từ khóa tìm kiếm
 * @param pagenumber: Số trang hiện tại
 * @param pagesize : Số lượng bản ghi/trang
 * @returns: Một mảng dữ liệu thỏa mãn điều kiện
 * Author: NVQUY(06/10/2023)
 */
export const searchAndPaging = async (
  res: Response,
  keySeach: string,
  pagenumber: number,
  pagesize: number
) => {
  try {
    // Lấy dữ liệu trong databse
    const users = await database.execute(
      "CALL Proc_user_SearchAndPaging(?,?,?)",
      [keySeach, pagenumber, pagesize]
    );

    // Trả dữ liệu ra controller
    return users;
  } catch (error: any) {
    handleReponseData(res, null, HttpStatus.ERROR, error, HttpMessage.FAILED);
  }
};

export const create = async (res: Response, request: User) => {
  try {
    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);

    // Mã hóa mật khẩu lấy từ client
    const hashPassword = bcrypt.hashSync(request.Passwords, salt);

    // Tạo id mới
    const newUserId = uuidv4();

    await database.execute("CALL Proc_user_create(?,?,?,?,?,?,?,?,?,?,?)", [
      newUserId,
      request.UserName,
      request.Gender,
      request.DateOfBirth,
      request.Email,
      hashPassword,
      request.ClassId,
      formatYMD(new Date()),
      request.CreatedBy,
      formatYMD(new Date()),
      request.ModifiedBy,
    ]);
    return handleReponseData(res, "", 201, "", "Thêm mới dữ liệu thành công.");
  } catch (error) {
    return handleReponseData(res, error, 500, "", "Lỗi hệ thống.");
  }
};

export const findUserByEmail = async (res: Response, email: string) => {
  try {
    const [user] = await database.execute("CALL Proc_user_findUserByEmail(?)", [
      email,
    ]);
    return user;
  } catch (error) {
    return handleReponseData(res, error, 500, "", "Lỗi hệ thống.");
  }
};
