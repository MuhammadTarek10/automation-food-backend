const { App } = require("../config/api/endpoints");

const BASE = `/${App.BASE}/${App.VERSION}`;

module.exports = function (app) {
  require("./cors")(app);
  require("./parser")(app);
  require("./swagger")(app, BASE);
};
