import { Request, Response } from "express";
import userUpdateService from "../../services/user/userUpdate.service";

const userUpdateController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    //if (!id) {
    //  throw new AppError(404, "Invalid user!");
    //}
    const user = await userUpdateService(id);
    return resp.json(user);
  } catch (error) {
    //if (error instanceof AppError) {
    //handleError(error, resp);
    //}
  }
};

export default userUpdateController;
