import { config } from "dotenv";
import pkg, { PoolConfig } from "pg";
const { Pool } = pkg;
config();

const dbConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT),
  max: Number(process.env.DB_MAX),
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
