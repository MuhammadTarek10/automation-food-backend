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
    SESSION: "Session",
    ORDER: "Order",
    USER: "User",
    CONCLUSION: "Conclusion",
  },
  RoutesStrings: {
    SESSION: "/api/session",
    ORDER: "/api/order",
    USER: "/api/user",
    AUTH: "/api/auth",
    CONCLUSION: "/api/conclusion",
  },
  SessionRoutesStrings: {
    GET_SESSIONS: "/get-sessions",
    CREATE_SESSION: "/create-session",
    SEARCH_SESSION: "/search-session",
  },
  AuthRoutesSettings: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  UserRoutesStrings: {
    GET_USERS: "/grab",
  },
  OrderRoutesStrings: {
    GET_ORDERS: "/get-orders",
    ADD_ORDER: "/add-order",
  },
  ConclusionRoutesStrings: {
    GET_CONCLUSION: "/get-conclusion",
  },
  HeaderStrings: {
    AUTHORIZATION: "x-auth-token",
  },
  ExpirationOfJWT: {
    EXPIRATION_TIME: "1h",
  },
};
