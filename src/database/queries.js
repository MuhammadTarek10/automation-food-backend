export const queryList = {
  GET_USERS: "SELECT id, name, email FROM food.users",
  CREATE_USER:
    "INSERT INTO food.users (name, email, password) VALUES ($1, $2, $3)",
  DELETE_ALL_USERS: "DELETE FROM food.users",

  GET_ALL_FOOD: "SELECT * FROM food.food",
  ADD_FOOD:
    "INSERT INTO food.food (name, price, restaurant) VALUES ($1, $2, $3)",
  GET_FOOD_BY_USER: "SELECT * FROM food.food WHERE user_id = $1",
  GET_FOOD_BY_ROOM: "SELECT * FROM food.food WHERE room_id = $1",
};

export default queryList;
