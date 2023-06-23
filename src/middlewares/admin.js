const { getStatusMessage } = require("../config/constants/functions");
const { StatusCodes } = require("../config/constants/status_codes");

function isAdmin(req, res, next) {
  if (!req.user.isAdmin)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getStatusMessage(StatusCodes.UNAUTHORIZED));
  next();
}

module.exports = isAdmin;
