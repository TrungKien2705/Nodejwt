import express from "express";
import { body } from "express-validator";
import { userController } from "../controller/index.js";
const router = express.Router();

router.get("/", userController.getAllUser);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
  userController.login
);

router.post("/register", userController.register);

export default router;
