import AppDataSource from "../../data-source";
import { User } from "../../entities/user/user.entity";
import { IUserUpdate } from "../../interfaces/user";
import { AppError } from "../../errors/appError";
import bcrypt from "bcryptjs";

const userUpdateService = async ({
  name,
  email,
  password,
  phone,
  id,
}: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new AppError(404, "User not found!");
  }

  if (password) {
    user.password = bcrypt.hashSync(password, 10);
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone;

  await userRepository.save(user);

  return user;
};

export default userUpdateService;
