import { Request, Response } from "express";
import * as userService from "./../services/user.service";
import { handleReponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";

// API lấy thông tin, tìm kiếm và phân trang
export const searchAndPaging = async (req: Request, res: Response) => {
  // Lấy các thông số từ client
  const keySeach: string = String(req.query.keysearch);
  const pagenumber: number = Number(req.query.pagenumber);
  const pagesize: number = Number(req.query.pagesize);

  const [users]: any = await userService.searchAndPaging(
    res,
    keySeach,
    pagenumber,
    pagesize
  );

  if (!Array.isArray(users)) {
    throw new Error(HttpMessage.FAILED);
  }
  // Lấy ra tổng số bản ghi tìm thấy
  const totalCount = users[0][0].total;

  // Lấy ra toàn bộ dữ liệu tìm thấy
  const listUser = users[1];

  const data = {
    totalCount,
    listUser,
  };

  // Trả về kết quả cho client
  handleReponseData(res, data, HttpStatus.SUCCESS, "", HttpMessage.SUCCESS);
};
