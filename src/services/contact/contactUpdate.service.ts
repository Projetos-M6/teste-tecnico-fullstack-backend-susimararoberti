import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts/contacts.entity";
import { IContactUpdate } from "../../interfaces/contacts";
import { AppError } from "../../errors/appError";

const contactUpdateService = async ({
  name,
  email,
  phone,
  id,
}: IContactUpdate) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id });
  if (!contact) {
    throw new AppError(404, "Contact not found!");
  }

  contact.name = name || contact.name;
  contact.email = email || contact.email;
  contact.phone = phone || contact.phone;

  await contactRepository.save(contact);

  return contact;
};

export default contactUpdateService;
