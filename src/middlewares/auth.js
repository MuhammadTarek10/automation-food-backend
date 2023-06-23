const jwt = require("jsonwebtoken");
const { getStatusMessage } = require("../config/constants/functions");

const { StatusCodes } = require("../config/constants/status_codes");
const { HeaderStrings } = require("../config/constants/strings");
const dotenv = require("dotenv");
dotenv.config();

function auth(req, res, next) {
  const token = req.header(HeaderStrings.AUTHORIZATION);
  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getStatusMessage(StatusCodes.UNAUTHORIZED));

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(getStatusMessage(StatusCodes.BAD_REQUEST));
  }
}

module.exports = auth;
