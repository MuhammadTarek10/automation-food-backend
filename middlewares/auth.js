const jwt = require("jsonwebtoken");
const { getStatusMessage } = require("../constants/functions");
const { StatusCodes } = require("../constants/status_codes");
const { HeaderStrings } = require("../constants/strings");
const { JWT_SECRET } = require("../start/config");

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
