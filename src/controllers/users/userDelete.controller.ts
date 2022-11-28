import { Request, Response } from "express";
import userDeleteService from "../../services/user/userDelete.service";

const userDeleteController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    //if (!id) {
    //  throw new AppError(404, "Invalid user!");
    //}
    const _ = await userDeleteService(id);
    return resp.status(204).json({ message: "User deleted successfully!" });
  } catch (error) {
    //if (error instanceof AppError) {
    //handleError(error, resp);
    //}
  }
};

export default userDeleteController;
