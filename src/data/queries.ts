export const queryList = {
  //* Users
  GET_USERS:
    "SELECT id, name, email \
    FROM users",
  CREATE_USER:
    "INSERT INTO users (name, email, password) \
    VALUES ($1, $2, $3)",
  GET_USER_BY_EMAIL:
    "SELECT id, name, email, password FROM users \
    WHERE email = $1 LIMIT 1",
  GET_USER_BY_ID:
    "SELECT id, name, email FROM users \
    WHERE id = $1 LIMIT 1",
  GET_USER:
    "SELECT name, email from users \
    WHERE email = $1 \
    AND password = $2 \
    LIMIT 1",
  DELETE_ALL_USERS: "DELETE FROM users",

  //* Food
  GET_ALL_FOOD: "SELECT * FROM food",
  CREATE_FOOD:
    "INSERT INTO food (name, price, restaurant, user_id) \
    VALUES ($1, $2, $3, $4) \
    RETURNING id",
  GET_FOOD_BY_ID: "SELECT * FROM food WHERE id = $1",
  GET_FOOD_BY_USER_ID: "SELECT * FROM food WHERE user_id = $1",
  GET_FOOD_BY_ROOM_ID:
    "SELECT f.*, u.name AS username \
    FROM food as f \
    INNER JOIN users as u \
    ON f.user_id = u.id \
    INNER JOIN food_history as fh \
    ON fh.room_id = $1 \
    GROUP BY f.id, u.name \
    ORDER BY f.name",
  GET_FOOD_BY_CATEGORY_ID:
    "SELECT f.* \
    FROM food as f \
    INNER JOIN food_category as fc \
    ON fc.id = $1",
  IS_FOOD_IN_ROOM:
    "SELECT * \
    FROM food_history \
    WHERE room_id = $1 \
    AND food_id = $2",
  ADD_FOOD_TO_ROOM:
    "INSERT INTO food_history \
    (food_id, room_id, user_id) \
    VALUES ($1, $2, $3)",
  UPDATE_FOOD:
    "UPDATE food \
    SET name = $2, price = $3, restaurant = $4 \
    WHERE id = $1",
  DELETE_FOOD:
    "DELETE FROM food \
    WHERE id = $1",

  // * Food Category
  CREATE_CATEGORY:
    "INSERT INTO food_category (name, user_id) \
    VALUES ($1, $2)",
  GET_CATEGORY_BY_ID:
    "SELECT * FROM food_category \
    WHERE id = $1",
  GET_CATEGORY_BY_USER_ID:
    "SELECT fd.*, u.name AS username \
    FROM food_category AS fd \
    INNER JOIN users AS u \
    ON fd.user_id = u.id \
    WHERE user_id = $1 \
    ORDER BY fd.id",
  UPDATE_CATEGORY:
    "UPDATE food_category \
    SET name = $2 \
    WHERE id = $1",
  DELETE_CATEGORY:
    "DELETE FROM food_category \
    WHERE id = $1",

  //* Rooms
  GET_ALL_ROOMS:
    "SELECT r.id, r.name, r.code, r.admin_id \
    FROM users_rooms AS ur \
    LEFT JOIN users AS u \
    ON u.id = ur.user_id \
    RIGHT JOIN rooms AS r \
    ON ur.room_id = r.id OR r.admin_id = u.id \
    GROUP BY r.id \
    ORDER BY r.id",
  GET_MY_ROOMS:
    "(SELECT * \
    FROM rooms \
    WHERE admin_id = $1) \
    UNION \
    (SELECT r.* \
    FROM users_rooms AS ur \
    INNER JOIN rooms AS r \
    ON ur.room_id = r.id \
    WHERE ur.user_id = $1 \
    GROUP BY r.id \
    ORDER BY r.id)",
  CREATE_ROOM:
    "INSERT INTO rooms (name, code, admin_id) \
    VALUES ($1, $2, $3)",
  GET_ROOM_BY_USER_ID:
    "SELECT r.id, r.name, r.code\
    FROM users_rooms AS ur\
    INNER JOIN rooms AS r \
    ON r.id = ur.room_id \
    OR r.admin_id = $1 \
    GROUP BY r.id \
    ORDER BY r.id",
  ADD_USER_TO_ROOM:
    "INSERT INTO users_rooms (user_id, room_id) \
    VALUES ($1, $2)",
  GET_ROOM_BY_CODE:
    "SELECT * FROM rooms \
    WHERE code = $1",
  GET_ROOM_BY_ID:
    "SELECT * FROM rooms \
    WHERE id = $1",
  USER_IN_ROOM:
    "SELECT ur.user_id AS users \
    FROM users_rooms AS ur \
    WHERE ur.room_id = $1 \
    AND ur.user_id = $2;",
  ALL_USERS_IN_ROOM:
    "(SELECT u.name, u.email \
    FROM users AS u \
    INNER JOIN users_rooms AS ur \
    ON ur.room_id = $1) \
    UNION \
    (SELECT u.name, u.email \
    FROM users AS u \
    INNER JOIN rooms AS r \
    ON r.admin_id = u.id \
    WHERE r.id = $1)",
  GET_ROOM_ADMIN:
    "SELECT admin_id \
    FROM rooms \
    WHERE id = $1 \
    AND admin_id = $2",
  DELETE_ALL_ROOMS: "DELETE FROM rooms",
  DELETE_ROOM_BY_ID: "DELETE FROM rooms WHERE id = $1",
  UPDATE_ROOM_BY_ID:
    "UPDATE rooms \
    SET name = $2, code = $3 \
    WHERE id = $1",

  //* Orders
  GET_ALL_ORDERS:
    "SELECT o.*, u.name AS user_name, r.name AS room_name \
    FROM orders AS o \
    INNER JOIN users AS u \
    ON o.user_id = u.id \
    INNER JOIN rooms AS r \
    ON o.room_id = r.id",
  ADD_ORDER:
    "INSERT INTO orders (user_id, room_id) \
    VALUES ($1, $2) \
    RETURNING id",
  ADD_ORDERS_FOOD:
    "INSERT INTO orders_food (order_id, food_id) \
    VALUES ($1, $2)",
  GET_ORDERS_BY_USER:
    "SELECT * \
    FROM orders \
    WHERE o.user_id = $1",
  GET_ORDERS_BY_ROOM:
    "SELECT o.id, o.user_id, \
                  f.name AS food, \
                  f.price, \
                  u.name AS username, \
                  f.restaurant \
    FROM orders AS o \
    INNER JOIN users AS u \
    ON o.user_id = u.id \
    INNER JOIN rooms AS r \
    ON o.room_id = r.id \
    INNER JOIN orders_food AS of \
    ON of.order_id = o.id \
    INNER JOIN food AS f \
    ON of.food_id = f.id \
    WHERE o.room_id = $1",
  DELETE_ORDERS_BY_ROOM: "DELETE FROM orders WHERE room_id = $1",
};

export default queryList;
