import { Router } from "express";

import userCreateController from "../controllers/user/userCreate.controller";
import userListController from "../controllers/user/userList.controller";
import userUpdateController from "../controllers/user/userUpdate.controller";
import userDeleteController from "../controllers/user/userDelete.controller";

import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";

import userSchema from "../schemas/user.schema";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "/register",
    validateSchemaMiddleware(userSchema),
    userCreateController
  );
  routes.get("", verifyAuthMiddleware, userListController);
  routes.patch("/update", verifyAuthMiddleware, userUpdateController);
  routes.delete("/delete", verifyAuthMiddleware, userDeleteController);

  return routes;
};
