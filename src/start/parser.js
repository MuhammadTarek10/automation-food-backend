import pkg from "body-parser";
const { json, urlencoded } = pkg;

export default function (app) {
  app.use(json());
  app.use(urlencoded({ extended: false }));
}
