import { IUserRequest } from "../../interfaces/user";
//importar entitie User

const userCreateService = async ({ name, emails, phones }: IUserRequest) => {
  return console.log("criando User");
};
export default userCreateService;
