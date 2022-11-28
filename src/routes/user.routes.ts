import { Router } from "express";

import userCreateController from "../controllers/users/userCreate.controller";
import userListController from "../controllers/users/userList.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";

//falta middlewares

const routes = Router();

export const userRoutes = () => {
  routes.post("/", userCreateController);
  routes.get("/:id", userListController);
  routes.patch("/:id", userUpdateController);
  routes.delete("/:id", userDeleteController);

  return routes;
};
