import jwt from "jsonwebtoken";
import { JwtObject } from "../config/types/types";

export function generateAuthToken(userId: string): string {
  const token = jwt.sign({ userId }, getJWTSecret());
  return token;
}

export function verifyAuthToken(token: string): string {
  const decoded = jwt.verify(token, getJWTSecret()) as JwtObject;
  return decoded.userId;
}

function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    process.exit(1);
  }
  return secret;
}
