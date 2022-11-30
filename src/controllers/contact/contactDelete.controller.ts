import { Request, Response } from "express";
import contactDeleteService from "../../services/contact/contactDelete.service";
import { AppError, handleError } from "../../errors/appError";

const contactDeleteController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const _ = await contactDeleteService({ id });

    return resp.status(202).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default contactDeleteController;
