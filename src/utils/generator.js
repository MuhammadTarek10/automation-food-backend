import pkg from "sequential-ids";
const { Generator } = pkg;

export const generator = new Generator({
  digits: 3,
  restore: "000",
});

generator.start();
