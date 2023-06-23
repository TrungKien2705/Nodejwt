import { param, validationResult } from "express-validator";
import { userRepositories } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
const myEvent = new EventEmitter();

myEvent.on("event.reigister.user", (param) => {
  console.log(`${JSON.stringify(param)}`);
});
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: errors.array() });
    }
    const user = await userRepositories.login(req.body);
    res.status(HttpStatusCode.OK).json({ data: user, msg: "Login seccess" });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: error.toString() });
  }
};

const register = async (req, res) => {
  myEvent.emit("event.reigister.user", req.body);

  try {
    const user = await userRepositories.register(req.body);
    if (user) {
      res
        .status(HttpStatusCode.INSERT_OK)
        .json({ data: user, msg: "Register seccess" });
    }
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: error.toString() });
  }
};

const getAllUser = () => {};
export default { login, register, getAllUser };
