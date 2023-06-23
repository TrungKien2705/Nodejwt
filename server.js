import express from "express";
import * as dotenv from "dotenv";
import { studentsRouter, usersRouter } from "./src/router/index.js";
dotenv.config();
import connect from "./src/database/database.js";
import checkToken from "./src/authentication/auth.js";
const port = process.env.PORT || 8081;
const app = express();
app.use(checkToken);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", usersRouter);
app.use("/students", studentsRouter);

app.listen(port, async () => {
  await connect();
  console.log(port);
});
