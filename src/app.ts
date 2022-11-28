import express from "express";
import { appRoutes } from "./routes";
//importar middleware

const app = express();
app.use(express.json());
appRoutes(app);
//middleware

export default app;
