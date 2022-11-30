import { Request, Response } from "express";
import contactListService from "../../services/contact/contactList.service";
import { AppError, handleError } from "../../errors/appError";

const contactListController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const contact = await contactListService({ id });

    return resp.status(200).json(contact);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, resp);
    }
  }
};

export default contactListController;
