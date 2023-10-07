import express, { Request, Response } from "express";
import userRouter from "./routes/user.routes";
import cors from "cors";

const app = express();
const port: number = 8080;

app.use(cors());

app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
