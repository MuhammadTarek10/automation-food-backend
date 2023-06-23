const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");
const { Swagger } = require("../config/api/endpoints");

module.exports = function (app, base) {
  app.use(
    `${base}/${Swagger.DOCS}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
};
