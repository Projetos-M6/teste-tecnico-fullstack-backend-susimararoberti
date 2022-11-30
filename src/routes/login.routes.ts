import { Router } from "express";
import loginController from "../controllers/login/login.controller";

import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";

import loginSchema from "../schemas/login.schema";

const routes = Router();

export const loginRoutes = () => {
  routes.post("/", validateSchemaMiddleware(loginSchema), loginController);

  return routes;
};
