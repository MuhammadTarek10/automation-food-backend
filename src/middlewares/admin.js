import { getStatusMessage } from "../config/constants/functions.js";
import { StatusCodes } from "../config/constants/status_codes.js";

function isAdmin(req, res, next) {
  if (!req.user.isAdmin)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(getStatusMessage(StatusCodes.UNAUTHORIZED));
  next();
}

export default isAdmin;
