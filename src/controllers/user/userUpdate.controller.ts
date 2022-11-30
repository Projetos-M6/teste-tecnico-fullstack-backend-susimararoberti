import { Request, Response } from "express";
import userUpdateService from "../../services/user/userUpdate.service";
import { AppError, handleError } from "../../errors/appError";

const userUpdateController = async (req: Request, resp: Response) => {
  try {
    const id = req.user.id;
    const { name, email, password, phone } = req.body;
    const updateUser = await userUpdateService({
      name,
      email,
      password,
      phone,
      id,
    });
    const { password: newPassword, ...user } = updateUser;
    return resp.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default userUpdateController;
