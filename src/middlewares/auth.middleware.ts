import jwt from "jsonwebtoken";
import { ExpressHandler, JwtObject } from "../config/types/types";
import { db } from "../data/dao/datasource.dao";

export const jwtMiddleware: ExpressHandler<any, any> = async (
  req,
  res,
  next
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();

  let payload: JwtObject;
  try {
    payload = verifyAuthToken(token);
  } catch (e) {
    return res.status(401).send({ error: `Bad Token | ${e}` });
  }

  const user = await db.getUserById(payload.userId);
  if (!user) return res.status(404).send({ error: "User not Found" });
  res.locals.userId = user.id;
  next();
};

export function generateAuthToken(userId: string): string {
  const token = jwt.sign({ userId }, getJWTSecret());
  return token;
}

function verifyAuthToken(token: string): JwtObject {
  const decoded = jwt.verify(token, getJWTSecret()) as JwtObject;
  return decoded;
}

function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    process.exit(1);
  }
  return secret;
}
