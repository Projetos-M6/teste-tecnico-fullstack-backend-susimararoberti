import AppDataSource from "../../data-source";
import { User } from "../../entities/user/user.entity";
import { IUserLogin } from "../../interfaces/user";
import { AppError } from "../../errors/appError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.find();
  const account = user.find((user) => user.email === email);
  if (!account) {
    throw new AppError(403, "Wrong email/password");
  }
  if (!bcrypt.compareSync(password, account.password)) {
    throw new AppError(403, "Wrong email/password");
  }

  const token = jwt.sign({ id: account.id }, process.env.SECRET_KEY as string, {
    subject: account.id,
    expiresIn: "24h",
  });

  return token;
};

export default loginService;
