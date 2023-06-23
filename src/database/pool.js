import pkg from "pg";
const { Pool } = pkg;
import { config } from "dotenv";
config();

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT,
  max: process.env.DB_MAX,
};

const pool = new Pool(dbConfig);

pool.on("connect", () => {
  console.log("connected to the db");
});

pool.on("error", (err, client) => {
  console.log(`Error, ${err}`);
});

pool.on("remove", () => {
  console.log("client removed");
});

export default pool;
