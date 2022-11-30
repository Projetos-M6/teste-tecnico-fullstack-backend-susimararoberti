import AppDataSource from "../../data-source";
import { User } from "../../entities/user/user.entity";
import { IUserRequest } from "../../interfaces/user";
import { AppError } from "../../errors/appError";
import bcrypt from "bcryptjs";

const userCreateService = async ({
  name,
  email,
  password,
  phone,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);
  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  await userRepository.save(user);
  return user;
};
export default userCreateService;
