import { Response } from "express";
import database from "../utils/database";
import { handleReponseData } from "../utils/handleResponse";
import { HttpMessage, HttpStatus } from "../utils/enum";

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
