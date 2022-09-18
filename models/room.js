const mongoose = require("mongoose");
const joi = require("joi");

const { ModelsStrings } = require("../constants/strings");

const roomSchema = new mongoose.Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsStrings.USER,
  },
  name: {
    type: String,
    required: true,
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
  users: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelsStrings.USER,
      },
    ],
  },
  orders: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelsStrings.ORDER,
      },
    ],
  },
});

const Room = mongoose.model(ModelsStrings.ROOM, roomSchema);

function validateRoom(room) {
  const schema = joi.object({
    name: joi.string().min(3).max(255).required(),
    code: joi.string().min(3).max(255).required(),
    number: joi.number().min(1).default(1),
  });
  return schema.validate(room);
}

function validateSearch(search) {
  const schema = joi.object({
    code: joi.string().min(3).max(255).required(),
  });
  return schema.validate(search);
}

module.exports.Room = Room;
module.exports.validate = validateRoom;
module.exports.validateSearch = validateSearch;
module.exports.roomSchema = roomSchema;
