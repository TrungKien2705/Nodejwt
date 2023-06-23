import mongoose from "mongoose";
import { print, OutputType } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.URL_MONGODB);
    if (connection) {
      print("connection mongodb success", OutputType.SUCCESS);
    }
    return connection;
  } catch (error) {
    throw new Exception("Error Connect");
  }
};

export default connect;
