import database from "../utils/database";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const create = async (request: User) => {
  // Mã hóa mật khẩu
  const salt = bcrypt.genSaltSync(10);

  // Mã hóa mật khẩu lấy từ client
  const hashPassword = bcrypt.hashSync(request.Passwords, salt);

  // Tạo id mới
  const newUserId = uuidv4();

  // Tạo đối tượng user
  const newUser = {
    UserId: newUserId,
    UserName: request.UserName,
    Gender: req,
  };

  await database.execute("CALL Proc_user_create(?,?,?,?,?,?,?,?,?,?,?)", []);
};
