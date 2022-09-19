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
    ROOM: "Room",
    ORDER: "Order",
    USER: "User",
    CONCLUSION: "Conclusion",
  },
  RoutesStrings: {
    ROOM: "/api/room",
    ORDER: "/api/order",
    USER: "/api/user",
    AUTH: "/api/auth",
    CONCLUSION: "/api/conclusion",
  },
  RoomRoutesStrings: {
    GET_ROOMS: "/get-rooms/:id",
    CREATE_ROOM: "/create-room/:id",
    SEARCH_ROOM: "/search-room/:id",
    DELETE_ROOM: "/delete-room/:id",
  },
  AuthRoutesSettings: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  UserRoutesStrings: {
    GET_USERS: "/grab",
  },
  OrderRoutesStrings: {
    GET_ORDERS: "/get-orders/:id",
    ADD_ORDER: "/add-order/:id",
    EDIT_ORDER: "/edit-order/:id",
    DELETE_ORDER: "/delete-order/:id",
  },
  ConclusionRoutesStrings: {
    GET_CONCLUSION: "/get-conclusion/:id/:room_id",
  },
  HeaderStrings: {
    AUTHORIZATION: "x-auth-token",
  },
  ExpirationOfJWT: {
    EXPIRATION_TIME: "1h",
  },
};
