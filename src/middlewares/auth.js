import jwt from "jsonwebtoken";
import { getStatusMessage } from "../config/constants/functions.js";
import { StatusCodes } from "../config/constants/status_codes.js";
import { HeaderStrings } from "../config/constants/strings.js";
import { config } from "dotenv";
config();

function auth(req, res, next) {
  const token = req.header(HeaderStrings.AUTHORIZATION);
  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getStatusMessage(StatusCodes.UNAUTHORIZED));

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(getStatusMessage(StatusCodes.BAD_REQUEST));
  }
}

export default auth;
