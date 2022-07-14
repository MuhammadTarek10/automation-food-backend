const mongoose = require("mongoose");
const joi = require("joi");
const { ModelsStrings } = require("../constants/strings");

const sessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsStrings.USER,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  code: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  number: {
    type: Number,
    min: 1,
    default: 1,
  },
});

const Session = mongoose.model(ModelsStrings.SESSION, sessionSchema);

function validateSession(session) {
  const schema = joi.object({
    name: joi.string().min(3).max(255).required(),
    code: joi.string().min(3).max(255).required(),
    number: joi.number().min(1).default(1),
  });
  return schema.validate(session);
}

function validateSearch(search) {
  const schema = joi.object({
    code: joi.string().min(3).max(255).required(),
  });
  return schema.validate(search);
}

module.exports.Session = Session;
module.exports.validate = validateSession;
module.exports.validateSearch = validateSearch;
module.exports.sessionSchema = sessionSchema;
