import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts/contacts.entity";
import { User } from "../../entities/user/user.entity";
import { IContactRequest } from "../../interfaces/contacts";
import { AppError } from "../../errors/appError";

const contactCreateService = async ({
  userId,
  name,
  email,
  phone,
}: IContactRequest) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const contact = contactRepository.create({
    user,
    name,
    email,
    phone,
  });
  await contactRepository.save(contact);

  return contact;
};

export default contactCreateService;
