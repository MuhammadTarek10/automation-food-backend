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
  },
};

export const BasePoints = {
  USER: "users",
  FOOD: "food",
};

export const Swagger = {
  DOCS: "swagger-docs",
};
