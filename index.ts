import bodyParser from "body-parser";
// import cors from "cors";
import express from "express";

// import { errorHandler } from "./middleware/errorHandler";
// import { getLanguage } from "./middleware/getLanguage";
// import routes from "./routes";
// import { dbCreateConnection } from "./typeorm/dbCreateConnection";

export const app = express();
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(getLanguage);

const port = process.env.PORT || 4000;
app.use("/", (req, res) => res.send(`okeee ${port}`));

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running  on port ${port}`);
});

// (async () => {
//   await dbCreateConnection();
// })();
