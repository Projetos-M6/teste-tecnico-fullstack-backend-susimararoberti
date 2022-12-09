import { IUserRequest, IUserLogin, IUserUpdate } from "../../interfaces/user";
import { IContactRequest, IContactUpdate } from "../../interfaces/contacts";

export const mockedUser: IUserRequest = {
  name: "Fulano Silva",
  email: "fulano@email.com",
  password: "Bolinha10*",
  phone: "9991929394",
};

export const mockedLogin: IUserLogin = {
  email: "fulano@email.com",
  password: "Bolinha10*",
};

export const mockedUserUpdate: IUserUpdate = {
  phone: "9999897965",
  id: "",
};

export const mockedContact: IContactRequest = {
  userId: "",
  name: "Sicrano Souza",
  email: "sicrano@email.com",
  phone: "9998979695",
};

export const mockedContactUpdate: IUserUpdate = {
  name: "Sicrano Souza Barbosa",
  phone: "9990999298",
  id: "",
};
