const mongopse = require('mongoose');
const joi = require("joi");
const { ModelsStrings } = require('../constants/strings');


const orderSchema = new mongopse.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    order: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    done: {
        type: Boolean,
        default: false
    }
});

const Order = mongopse.model(ModelsStrings.ORDER, orderSchema);

function validateOrder(order){
    const schema = {
        name: joi.string().min(3).max(255).required(),
        order: joi.string().min(3).max(255).required(),
        price: joi.number().min(0).required(),
        done: joi.boolean()
    };
    return joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateOrder;
exports.orderSchema = orderSchema;