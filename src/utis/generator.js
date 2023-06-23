const sequential = require("sequential-ids");

const generator = new sequential.Generator({
  digits: 3,
  restore: "000",
});

generator.start();

module.exports = generator;