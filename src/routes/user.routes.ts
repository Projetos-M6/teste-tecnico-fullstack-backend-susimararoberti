import { Router } from "express";

import userCreateController from "../controllers/user/userCreate.controller";
import userListController from "../controllers/user/userList.controller";
import userUpdateController from "../controllers/user/userUpdate.controller";
import userDeleteController from "../controllers/user/userDelete.controller";

//falta middlewares

const routes = Router();

export const userRoutes = () => {
  routes.post("/", userCreateController);
  routes.get("/:id", userListController);
  routes.patch("/:id", userUpdateController);
  routes.delete("/:id", userDeleteController);

  return routes;
};
