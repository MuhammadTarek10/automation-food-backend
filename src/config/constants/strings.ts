export const StatusCodeStrings = {
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
  NOT_IMPLEMENTED: "Not Implemented",
  SERVICE_UNAVAILABLE: "Service Unavailable",
  GATEWAY_TIMEOUT: "Gateway Timeout",
  INVALID_USER: "Invalid User",
  USER_NOT_FOUND: "User Not Found",
  USER_ALREADY_EXISTS: "User already exists",
  INVALID_FOOD: "Invalid Food",
  INVALID_ROOM: "Invalid Room",
  INVALID_CODE: "No Room with this code",
  USER_ALREADY_IN_ROOM: "User already in the room",
  FOOD_ALREADY_IN_ROOM: "Food already in room",
  INVALID_ORDER: "Invalid Order",
  ORDER_NOT_FOUND: "Order Not Found",
  ORDER_ALREADY_EXISTS: "Order already exists",
};
export const ModelsStrings = {
  ROOM: "Room",
  ORDER: "Order",
  USER: "User",
  CONCLUSION: "Conclusion",
};
export const RoutesStrings = {
  ROOM: "/api/room",
  ORDER: "/api/order",
  USER: "/api/user",
  AUTH: "/api/auth",
  CONCLUSION: "/api/conclusion",
};
export const RoomRoutesStrings = {
  GET_ROOMS: "/get-rooms/:id",
  GET_ROOM: "/get-room/:room_id",
  CREATE_ROOM: "/create-room/:id",
  JOIN_ROOM: "/join-room/:id",
  DELETE_ROOM: "/delete-room/:id/:room_id",
};
export const AuthRoutesSettings = {
  LOGIN: "/login",
  REGISTER: "/register",
};
export const UserRoutesStrings = {
  GET_USERS: "/grab",
};
export const OrderRoutesStrings = {
  GET_ORDERS: "/get-orders/:id/:room_id",
  ADD_ORDER: "/add-order/:id",
  EDIT_ORDER: "/edit-order/:id",
  DELETE_ORDER: "/delete-order/:id/:user_id",
};
export const ConclusionRoutesStrings = {
  GET_CONCLUSION: "/get-conclusion/:id",
};
export const HeaderStrings = {
  AUTHORIZATION: "x-auth-token",
};
export const ExpirationOfJWT = {
  EXPIRATION_TIME: "1h",
};
