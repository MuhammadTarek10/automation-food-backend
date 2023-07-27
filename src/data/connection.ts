import pool from "./pool";

export function dbQuery(queryText: string, queryParams?: any[] | undefined) {
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, queryParams)
      .then((res: unknown) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}

export default dbQuery;
