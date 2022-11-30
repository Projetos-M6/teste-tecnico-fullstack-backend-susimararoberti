import { Router } from "express";

import contactCreateController from "../controllers/contact/contactCreate.controller";
import contactListController from "../controllers/contact/contactList.controller";
import contactUpdateController from "../controllers/contact/contactUpdate.controller";
import contactDeleteController from "../controllers/contact/contactDelete.controller";

import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";

import contactSchema from "../schemas/contact.schema";

const routes = Router();

export const contactRoutes = () => {
  routes.post(
    "/",
    validateSchemaMiddleware(contactSchema),
    verifyAuthMiddleware,
    contactCreateController
  );
  routes.get("/:id", verifyAuthMiddleware, contactListController);
  routes.patch("/:id", verifyAuthMiddleware, contactUpdateController);
  routes.delete("/:id", verifyAuthMiddleware, contactDeleteController);

  return routes;
};
