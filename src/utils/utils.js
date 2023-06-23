import { generate } from "randomstring";

export function generateCode() {
  return generate({
    length: 6,
    charset: "alphabetic",
    capitalization: "uppercase",
  });
}

export function dateFormat() {
  return Date(Date.now().toLocaleString());
}
