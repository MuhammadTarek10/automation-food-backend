const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ModelsStrings, ExpirationOfJWT } = require("../constants/strings");
const { JWT_SECRET } = require("../start/config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, JWT_SECRET, {
    expiresIn: ExpirationOfJWT.EXPIRATION_TIME,
  });
};

const User = mongoose.model(ModelsStrings.USER, userSchema);

function validateUser(user) {
  const schema = joi.object({
    name: joi.string().min(2).max(255).required(),
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
