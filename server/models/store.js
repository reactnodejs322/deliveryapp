const mongoose = require("mongoose");
const joi = require("joi");

function validateStore(input) {
  const schema = joi.object({
    number: joi.number().required(),
    name: joi.string().required(),
    location: joi.object().required(),
    users: joi.array(),
  });
  return schema.validate(input);
}

const storeSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  users: {
    type: Array,
    required: true,
    default: [],
  },
});

const Store = new mongoose.model("Stores", storeSchema);

module.exports.Store = Store;
module.exports.validateStore = validateStore;
