import jwt from "jsonwebtoken";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const checkToken = async (req, res, next) => {
  //bypass login , register
  if (
    req.url.toLowerCase().trim() === "/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() === "/users/register".toLowerCase().trim()
  ) {
    next();
    return;
  } else {
    const token = req.headers?.authorization?.split(" ")[1];
    // console.log(token);

    try {
      const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
      const isExpired = Date.now() >= jwtObject.exp * 1000;
      if (isExpired) {
        // token het han
        res.status(HttpStatusCode.BAD_REQUEST).json({
          meg: "Token is expired",
        });
        res.end();
      } else {
        next();
      }
      // console.log(jwtObject);
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: error.message,
      });
    }
  }
};

export default checkToken;
