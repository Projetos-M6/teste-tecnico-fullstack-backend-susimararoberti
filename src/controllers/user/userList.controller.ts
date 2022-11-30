import { Request, Response } from "express";
import userListService from "../../services/user/userList.service";
import { AppError, handleError } from "../../errors/appError";
import { instanceToPlain } from "class-transformer";

const userListController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const user = await userListService({ id });

    return resp.status(200).json(instanceToPlain(user));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default userListController;
