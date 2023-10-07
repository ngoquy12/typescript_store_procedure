import { Response } from "express";

export const handleReponseData = (
  res: Response,
  data: any,
  status: number,
  devMsg: string,
  userMsg: string
) => {
  return res.status(status).json({
    data: data,
    devMsg: devMsg,
    userMsg: userMsg,
    status: status,
  });
};
