module.exports = {
  StatusCodeStrings: {
    OK: "OK",
    CREATED: "Created",
    NO_CONTENT: "No Content",
    BAD_REQUEST: "Bad Request",
    UNAUTHORIZED: "Unauthorized",
    NOT_FOUND: "Not Found",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    FORBIDDEN: "Forbidden",
    CONFLICT: "Already Exists",
    UNPROCESSABLE_ENTITY: "Unprocessable Entity",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    NOT_IMPLEMENTED: "Not Implemented",
    SERVICE_UNAVAILABLE: "Service Unavailable",
    GATEWAY_TIMEOUT: "Gateway Timeout",
  },
  ModelsStrings: {
    ORDER: "Order",
    USER: "User",
    CONCLUSION: "Conclusion",
  },
  RoutesStrings: {
    ORDER: "/api/order",
    USER: "/api/user",
    AUTH: "/api/auth",
    CONCLUSION: "/api/conclusions",
  },
  HeaderStrings: {
    AUTHORIZATION: "x-auth-token",
  },
  ExpirationOfJWT: {
    EXPIRATION_TIME: "1h",
  },
};
