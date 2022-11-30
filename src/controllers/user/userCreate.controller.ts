import { Request, Response } from "express";
import userCreateService from "../../services/user/userCreate.service";
import { AppError, handleError } from "../../errors/appError";
import { instanceToPlain } from "class-transformer";

const userCreateController = async (req: Request, resp: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    const newUser = await userCreateService({ name, email, password, phone });

    return resp.status(201).json(instanceToPlain(newUser));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default userCreateController;
