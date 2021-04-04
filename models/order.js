const mongoose = require("mongoose")
const joi = require("joi");

function validateOrder(order) {
    const schema = joi.object({
        orderNumber: joi.number().required(),
        status: joi.string(),
        driver: joi.number(),
        date: joi.string(),
        time: joi.string(),
        firstName: joi.string(),
        lastName: joi.string(),
        phoneNumber: joi.string(),
        address: joi.string().required(),
        city: joi.string(),
        zip: joi.string(),
        marker: joi.object(),
    })
    return schema.validate(order)
};

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'unassigned'
    },
    driver: {
        type: Number,
    },
    date: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 50,
    },
    phoneNumber: {
        type: String,
        required: false,
        minlength: 10,
        maxlength: 16,
    },
    address: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
    },
    city: {
        type: String,
        required: false,
    },
    zip: {
        type: String,
        required: false
    },
    marker: {
      type: Object,
      required: false
    }
});

const Order = new mongoose.model("Orders", orderSchema);

module.exports.Order = Order;
module.exports.validateOrder = validateOrder;
module.exports.orderSchema = orderSchema;