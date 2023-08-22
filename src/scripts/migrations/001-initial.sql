CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    admin_id SERIAL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users_rooms (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    room_id SERIAL REFERENCES rooms(id) ON DELETE CASCADE
);

CREATE TYPE FOOD_TYPE AS ENUM ('Syrian', 'Burger', 'Pizza', 'Appetizers');

CREATE TABLE IF NOT EXISTS food_category (
    id SERIAL PRIMARY KEY NOT NULL,
    name FOOD_TYPE NOT NULL,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS food (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    restaurant TEXT,
    -- category_id SERIAL NULL REFERENCES food_category(id),
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS food_history (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    food_id SERIAL REFERENCES food(id) ON DELETE CASCADE,
    room_id SERIAL REFERENCES rooms(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    room_id SERIAL REFERENCES rooms(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders_food (
    id SERIAL PRIMARY KEY NOT NULL,
    order_id SERIAL REFERENCES orders(id) ON DELETE CASCADE,
    food_id SERIAL REFERENCES food(id) ON DELETE CASCADE
);

CREATE TRIGGER delete_food
    AFTER DELETE ON food
    FOR EACH ROW
    EXECUTE PROCEDURE delete_food_history();
    EXECUTE PROCEDURE delete_orders_food();
    EXECUTE PROCEDURE delete_order();

CREATE OR REPLACE FUNCTION delete_food_history()
    RETURNS TRIGGER AS $$
    BEGIN
        DELETE FROM food_history WHERE food_id = OLD.id;
        RETURN OLD;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_orders_food()
    RETURNS TRIGGER AS $$
    BEGIN
        DELETE FROM orders_food WHERE food_id = OLD.id;
        RETURN OLD;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_order()
    RETURNS TRIGGER AS $$
    BEGIN
        DELETE FROM orders WHERE id = OLD.order_id;
        RETURN OLD;
    END;
    $$ LANGUAGE plpgsql;