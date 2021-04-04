const mongoose = require("mongoose");
const joi = require("joi");
// const jwt = require("jsonwebtoken");
// const config = require("config");

function validateUser(input) {
  const schema = joi.object({
    firstName: joi.string().min(3).max(50).required(),
    lastName: joi.string().min(3).max(50),
    employeeId: joi.number().min(3).required(),
    isAdmin: joi.boolean()
  });
  return schema.validate(input);
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: false,
    maxlength: 50,
    minlength: 3,
  },
  employeeId: {
    type: Number,
    required: true,
    maxlength: 10,
    minlength: 3,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this.id, isAdmin: this.isAdmin },
//     config.get("jwtPrivateKey")
//   );
//   return token;
// };

const User = new mongoose.model("Users", userSchema);

module.exports.User = User;
module.exports.validateUser = validateUser;
