import { Router } from "express";

import contactCreateController from "../controllers/contact/contactCreate.controller";
import contactListController from "../controllers/contact/contactList.controller";
import contactUpdateController from "../controllers/contact/contactUpdate.controller";
import contactDeleteController from "../controllers/contact/contactDelete.controller";

const routes = Router();

export const contactRoutes = () => {
  routes.post("/", contactCreateController);
  routes.get("/:id", contactListController);
  routes.patch("/:id", contactUpdateController);
  routes.delete("/:id", contactDeleteController);

  return routes;
};
