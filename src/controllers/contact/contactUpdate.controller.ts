import { Request, Response } from "express";
import contactUpdateService from "../../services/contact/contactUpdate.service";
import { AppError, handleError } from "../../errors/appError";

const contactUpdateController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updateContact = await contactUpdateService({
      name,
      email,
      phone,
      id,
    });

    return resp.status(200).json(updateContact);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default contactUpdateController;
