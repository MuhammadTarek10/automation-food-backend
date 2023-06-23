export const queryList = {
  GET_USERS: "SELECT id, name, email FROM food.users",
  CREATE_USER:
    "INSERT INTO food.users (name, email, password) VALUES ($1, $2, $3)",
  DELETE_ALL_USERS: "DELETE FROM food.users",
};

export default queryList;
