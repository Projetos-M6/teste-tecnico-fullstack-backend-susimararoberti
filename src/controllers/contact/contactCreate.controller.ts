import { Request, Response } from "express";
import contactCreateService from "../../services/contact/contactCreate.service";
import { AppError, handleError } from "../../errors/appError";
import { instanceToPlain } from "class-transformer";

const contactCreateController = async (req: Request, resp: Response) => {
  try {
    const userId = req.user.id;
    const { name, email, phone } = req.body;
    const contact = await contactCreateService({
      userId,
      name,
      email,
      phone,
    });

    return resp.status(201).json(instanceToPlain(contact));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default contactCreateController;
