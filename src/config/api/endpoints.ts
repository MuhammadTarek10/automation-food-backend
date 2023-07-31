export const App = {
  BASE: "api",
  VERSION: "v1",
};

export const Endpoints = {
  USERS: {
    GET_USERS: "/users",
    REGISTER: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
  },

  FOOD: {
    FOOD: "/food",
    GET_FOOD_BY_CATEGORY: "/food/category/:id",
    GET_FOOD_BY_ROOM: "/food/room/:id",
    ADD_FOOD_TO_ROOM: "/food/join",
    GET_CATEGORY: "/food/category/:id",
    CATEGORY: "/food/category",
  },

  ROOM: {
    GET_ALL_ROOMS: "/room",
    CREATE_ROOM: "/room",
    GET_ROOM_BY_USER: "/room/user/:id",
    JOIN_ROOM: "/join",
    GET_MY_ROOMS: "/my",
    UPDATE_ROOM: "/update",
    DELETE_ROOM: "/delete",
  },

  ORDER: {
    GET_ALL_ORDERS: "/order",
    ADD_ORDER: "/order",
    GET_ORDER_BY_USER: "/order/user/:id",
    GET_ORDER_BY_ROOM: "/order/room/:id",
    ADD_ORDER_TO_ROOM: "/order/join",
    GET_MY_ORDERS: "/my/:id",
  },
};

export const BasePoints = {
  USER: "users",
  FOOD: "food",
  ROOM: "room",
  ORDER: "order",
};

export const Swagger = {
  DOCS: "swagger-docs",
};
