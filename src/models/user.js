const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Must enter a valid email");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    required: true,
    // we get as the first argument the value we are validating
    validate(value) {
      if (value < 0) {
        throw new Error("age must be greater than 0");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    required: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Invalid password field");
      }
    },
  },
});

module.exports = User;
