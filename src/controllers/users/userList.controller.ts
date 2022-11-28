import { Request, Response } from "express";
import userListService from "../../services/user/userList.service";

const userListController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    //if (!id) {
    //  throw new AppError(404, "Invalid user!");
    //}
    const user = await userListService(id);
    return resp.json(user);
  } catch (error) {
    //if (error instanceof AppError) {
    //handleError(error, resp);
    //}
  }
};

export default userListController;
