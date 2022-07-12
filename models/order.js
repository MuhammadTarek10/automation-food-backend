const mongopse = require("mongoose");
const joi = require("joi");
const { ModelsStrings } = require("../constants/strings");

const orderSchema = new mongopse.Schema({
  user_id: {
    type: mongopse.Schema.Types.ObjectId,
    ref: ModelsStrings.USER,
    required: true,
  },
  session_id: {
    type: mongopse.Schema.Types.ObjectId,
    ref: ModelsStrings.SESSION,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const Order = mongopse.model(ModelsStrings.ORDER, orderSchema);

function validateOrder(order) {
  const schema = joi.object({
    name: joi.string().min(3).max(255).required(),
    price: joi.number().min(0).required(),
    session_id: joi.string().required(),
    done: joi.boolean(),
  });
  return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;
exports.orderSchema = orderSchema;
