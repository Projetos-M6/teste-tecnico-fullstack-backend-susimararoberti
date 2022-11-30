import AppDataSource from "../../data-source";
import { User } from "../../entities/user/user.entity";
import { IUserId } from "../../interfaces/user";
import { AppError } from "../../errors/appError";

const userListService = async ({ id }: IUserId) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  return user;
};

export default userListService;
