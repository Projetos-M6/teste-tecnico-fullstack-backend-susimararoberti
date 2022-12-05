import express from "express";
import { appRoutes } from "./routes";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
appRoutes(app);

export default app;
