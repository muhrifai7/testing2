import "dotenv/config";
import "reflect-metadata";
import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { errorHandler } from "./middleware/errorHandler";
import { getLanguage } from "./middleware/getLanguage";
import routes from "./routes";
import { dbCreateConnection } from "./typeorm/dbCreateConnection";

export const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(getLanguage);

app.use("/", routes);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Microservice runs on port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();
