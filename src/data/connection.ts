import { PostgresObject } from "../config/types/types";
import pool from "./pool";

export default function dbQuery(
  queryText: string,
  queryParams?: any[] | undefined
): Promise<PostgresObject> {
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, queryParams)
      .then((res: PostgresObject) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
