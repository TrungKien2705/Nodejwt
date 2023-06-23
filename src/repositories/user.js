import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import Exception from "../exceptions/Exception.js";
import jwt from "jsonwebtoken";
const login = async (data) => {
  const existingUser = await User.findOne({ email: data.email }).exec();
  if (existingUser) {
    let isMatch = await bcrypt.compare(data.password, existingUser.password);

    if (isMatch) {
      //create jwt
      let token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      return {
        ...existingUser.toObject(),
        password: "Not Show",
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
    }
  } else {
    throw new Exception(Exception.USER_EXIST);
  }
};

const register = async (data) => {
  const existingUser = await User.findOne({ email: data.email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }
  const hashedPassword = await bcrypt.hash(
    data.password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phoneNumber: data.phoneNumber,
    address: data.address,
  });
  // delete newUser.password;
  return {
    ...newUser._doc,
    password: "Not show",
  };
};

export default { login, register };
