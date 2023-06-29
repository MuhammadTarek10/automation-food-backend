export const App = {
  BASE: "api",
  VERSION: "v1",
};
export const Endpoints = {
  USERS: {
    GET_USERS: "/users",
    CREATE_USER: "/register",
  },
  FOOD: {
    GET_ALL_FOOD: "/food",
    ADD_FOOD: "/food",
    GET_FOOD_BY_USER: "/food/user/:id",
    GET_FOOD_BY_ROOM: "/food/room/:id",
    ADD_FOOD_TO_ROOM: "/food/join",
  },
  ROOM: {
    GET_ALL_ROOMS: "/room",
    ADD_ROOM: "/room",
    GET_ROOM_BY_USER: "/room/user/:id",
    JOIN_ROOM: "/join",
    GET_MY_ROOMS: "/my/:id",
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
