import express from "express";
import path from "path";

export const app = express();
const port = process.env.PORT || 4000;

app.use("/", (req, res) => res.send(`oke ${port}`));

app.listen(port, () => {
  console.log(`Server running  on port ${port}`);
});
