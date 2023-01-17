const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// use this to add fields to the user model
userSchema.statics.findByCredentials = async (email, password) => {
  // because we set the email to be a unique field, only one result is possible
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// these methods are accessible on instances
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

  // save tokens to the database
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//use mongoose pre hooks to hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  // mongodb has this nice method that lets us know when a field in a document is modified
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
