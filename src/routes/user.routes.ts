import { Router } from "express";

import userCreateController from "../controllers/user/userCreate.controller";
import userListController from "../controllers/user/userList.controller";
import userUpdateController from "../controllers/user/userUpdate.controller";
import userDeleteController from "../controllers/user/userDelete.controller";

import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("/register", userCreateController);
  routes.get("", verifyAuthMiddleware, userListController);
  routes.patch("/update", verifyAuthMiddleware, userUpdateController);
  routes.delete("/delete", verifyAuthMiddleware, userDeleteController);

  return routes;
};
