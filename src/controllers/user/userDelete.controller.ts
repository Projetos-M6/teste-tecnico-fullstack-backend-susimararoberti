import { Request, Response } from "express";
import userDeleteService from "../../services/user/userDelete.service";
import { AppError, handleError } from "../../errors/appError";

const userDeleteController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const _ = await userDeleteService({ id });

    return resp.status(202).json({ message: "User deleted successfully!" });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default userDeleteController;
