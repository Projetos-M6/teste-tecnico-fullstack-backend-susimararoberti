import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts/contacts.entity";
import { IContactId } from "../../interfaces/contacts";
import { AppError } from "../../errors/appError";

const contactListService = async ({ id }: IContactId) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = await contactRepository.findOneBy({ id });

  if (!contact) {
    throw new AppError(404, "Contact not found!");
  }

  return contact;
};

export default contactListService;
