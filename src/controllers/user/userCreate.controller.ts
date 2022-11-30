import { Request, Response } from "express";
import userCreateService from "../../services/user/userCreate.service";
import { AppError, handleError } from "../../errors/appError";

const userCreateController = async (req: Request, resp: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    const newUser = await userCreateService({ name, email, password, phone });

    return resp.status(201).json(newUser);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default userCreateController;
