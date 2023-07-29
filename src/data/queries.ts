export const queryList = {
  //* Users
  GET_USERS:
    "SELECT id, name, email \
    FROM food.users",
  CREATE_USER:
    "INSERT INTO food.users (name, email, password) \
    VALUES ($1, $2, $3)",
  GET_USER_BY_EMAIL:
    "SELECT id, name, email, password FROM food.users \
    WHERE email = $1 LIMIT 1",
  GET_USER_BY_ID:
    "SELECT id, name, email FROM food.users \
    WHERE id = $1 LIMIT 1",
  GET_USER:
    "SELECT name, email from food.users \
    WHERE email = $1 \
    AND password = $2 \
    LIMIT 1",
  DELETE_ALL_USERS: "DELETE FROM food.users",

  //* Food
  GET_ALL_FOOD:
    "SELECT f.*, fd.name as category_name \
    FROM food.food AS f \
    INNER JOIN food.food_category as fd \
    ON f.category_id = fd.id",
  ADD_FOOD:
    "INSERT INTO food.food (name, price, restaurant, category_id, user_id) \
    VALUES ($1, $2, $3, $4, $5)",
  GET_FOOD_BY_USER_ID: "SELECT * FROM food.food WHERE user_id = $1",
  GET_FOOD_BY_ROOM_ID: "SELECT * FROM food.food WHERE room_id = $1",
  IS_FOOD_IN_ROOM:
    "SELECT * \
    FROM food.food_history \
    WHERE room_id = $1 \
    AND food_id = $2",
  ADD_FOOD_TO_ROOM:
    "INSERT INTO food.food_history \
    (food_id, room_id, user_id) \
    VALUES ($1, $2, $3)",

  //* Rooms
  GET_ALL_ROOMS:
    "SELECT r.id, r.name, r.code, r.admin_id \
    FROM food.users_rooms AS ur \
    LEFT JOIN food.users AS u \
    ON u.id = ur.user_id \
    RIGHT JOIN food.rooms AS r \
    ON ur.room_id = r.id OR r.admin_id = u.id \
    GROUP BY r.id \
    ORDER BY r.id",
  CREATE_ROOM:
    "INSERT INTO food.rooms (name, code, admin_id) \
    VALUES ($1, $2, $3)",
  GET_ROOM_BY_USER_ID:
    "SELECT r.id, r.name, r.code\
    FROM food.rooms AS r \
    INNER JOIN food.users_rooms AS ur\
    ON r.id = ur.room_id \
    OR r.admin_id = $1 \
    GROUP BY r.id \
    ORDER BY r.id",
  ADD_USER_TO_ROOM:
    "INSERT INTO food.users_rooms (user_id, room_id) \
    VALUES ($1, $2)",
  GET_ROOM_BY_CODE:
    "SELECT * FROM food.rooms \
    WHERE code = $1",
  USERS_IN_ROOM:
    "SELECT ur.user_id AS users \
    FROM food.users_rooms AS ur \
    WHERE ur.room_id = $1 \
    AND ur.user_id = $2;",
  GET_ROOM_ADMIN:
    "SELECT admin_id \
    FROM food.rooms \
    WHERE id = $1 \
    AND admin_id = $2",
  DELETE_ALL_ROOMS: "DELETE FROM food.rooms",

  //* Orders
  GET_ALL_ORDERS:
    "SELECT o.*, u.name AS user_name, r.name AS room_name \
    FROM food.orders AS o \
    INNER JOIN food.users AS u \
    ON o.user_id = u.id \
    INNER JOIN food.rooms AS r \
    ON o.room_id = r.id",
  ADD_ORDER:
    "INSERT INTO food.orders (user_id, room_id) \
    VALUES ($1, $2) \
    RETURNING id",
  ADD_ORDERS_FOOD:
    "INSERT INTO food.orders_food (order_id, food_id) \
    VALUES ($1, $2)",
  GET_ORDERS_BY_USER:
    "SELECT * \
    FROM food.orders \
    WHERE o.user_id = $1",
  GET_ORDERS_BY_ROOM:
    "SELECT o.*, u.name AS user_name, r.name AS room_name \
    FROM food.orders AS o \
    INNER JOIN food.users AS u \
    ON o.user_id = u.id \
    INNER JOIN food.rooms AS r \
    ON o.room_id = r.id \
    WHERE o.room_id = $1",
};

export default queryList;
