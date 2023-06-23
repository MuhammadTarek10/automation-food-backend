import { StatusCodes } from "./status_codes.js";
import { StatusCodeStrings as Strings } from "./strings.js";

function getStatusMessage(statusCode) {
  switch (statusCode) {
    case StatusCodes.OK:
      return Strings.OK;
    case StatusCodes.CREATED:
      return Strings.CREATED;
    case StatusCodes.NO_CONTENT:
      return Strings.NO_CONTENT;
    case StatusCodes.BAD_REQUEST:
      return Strings.BAD_REQUEST;
    case StatusCodes.UNAUTHORIZED:
      return Strings.UNAUTHORIZED;
    case StatusCodes.NOT_FOUND:
      return Strings.NOT_FOUND;
    case StatusCodes.INTERNAL_SERVER_ERROR:
      return Strings.INTERNAL_SERVER_ERROR;
    case StatusCodes.FORBIDDEN:
      return Strings.FORBIDDEN;
    case StatusCodes.CONFLICT:
      return Strings.CONFLICT;
    case StatusCodes.UNPROCESSABLE_ENTITY:
      return Strings.UNPROCESSABLE_ENTITY;
    case StatusCodes.INTERNAL_SERVER_ERROR:
      return Strings.INTERNAL_SERVER_ERROR;
    case StatusCodes.NOT_IMPLEMENTED:
      return Strings.NOT_IMPLEMENTED;
    case StatusCodes.SERVICE_UNAVAILABLE:
      return Strings.SERVICE_UNAVAILABLE;
    case StatusCodes.GATEWAY_TIMEOUT:
      return Strings.GATEWAY_TIMEOUT;
    default:
      return Strings.INTERNAL_SERVER_ERROR;
  }
}

const _getStatusMessage = getStatusMessage;
export { _getStatusMessage as getStatusMessage };
