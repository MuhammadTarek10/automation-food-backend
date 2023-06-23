const randomString = require("randomstring");

exports.generateCode = () => {
  return randomString.generate({
    length: 6,
    charset: "alphabetic",
    capitalization: "uppercase",
  });
};

exports.dateFormat = () => {
  return Date(Date.now().toLocaleString());
};
