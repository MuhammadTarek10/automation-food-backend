const mongoose = require("mongoose");
const joi = require("joi");

const { ModelsStrings } = require("../constants/strings");

const conclusionSchema = new mongoose.Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsStrings.USER,
    required: true,
  },

  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelsStrings.ROOM,
    required: true,
  },
});

const Conclusion = mongoose.model(ModelsStrings.CONCLUSION, conclusionSchema);

exports.Conclusion = Conclusion;
