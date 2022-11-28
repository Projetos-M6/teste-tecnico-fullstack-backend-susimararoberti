import { Request, Response } from "express";
import userCreateService from "../../services/user/userCreate.service";

const userCreateController = async (req: Request, resp: Response) => {
  try {
    return console.log("user criado");
  } catch (error) {
    //if (error instanceof AppError) {
    //handleError(error, resp);
    //}
  }
};

export default userCreateController;
