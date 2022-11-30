import { Request, Response } from "express";
import loginService from "../../services/login/login.service";
import { IUserLogin } from "../../interfaces/user";
import { AppError, handleError } from "../../errors/appError";

const loginController = async (req: Request, resp: Response) => {
  try {
    const { email, password }: IUserLogin = req.body;
    const token = await loginService({ email, password });

    return resp.status(200).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default loginController;
