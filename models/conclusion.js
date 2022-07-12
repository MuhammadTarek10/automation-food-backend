const mongoose = require("mongoose");
const { ModelsStrings } = require("../constants/strings");
const { orderSchema } = require("./order");

const conclusionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsStrings.USER,
    required: true,
  },
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsStrings.SESSION,
    required: true,
  },
  total: {
    type: Number,
    min: 0,
  },
  orders: {
    type: [
      {
        type: orderSchema,
        ref: ModelsStrings.ORDER,
      },
    ],
  },
});

const Conclusion = mongoose.model(ModelsStrings.CONCLUSION, conclusionSchema);

module.exports.Conclusion = Conclusion;
module.exports.conclusionSchema = conclusionSchema;
