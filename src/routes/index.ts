import { Express } from "express";

import { contactRoutes } from "./contact.routes";
import { userRoutes } from "./user.routes";
import { loginRoutes } from "./login.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/contacts", contactRoutes());
  app.use("/login", loginRoutes());
};
