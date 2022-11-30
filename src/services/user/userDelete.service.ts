import AppDataSource from "../../data-source";
import { User } from "../../entities/user/user.entity";
import { IUserId } from "../../interfaces/user";
import { AppError } from "../../errors/appError";

const userDeleteService = async ({ id }: IUserId) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  await userRepository.delete({ id });

  return true;
};

export default userDeleteService;
