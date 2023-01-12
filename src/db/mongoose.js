const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27018/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Must enter a valid email");
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     required: true,
//     // we get as the first argument the value we are validating
//     validate(value) {
//       if (value < 0) {
//         throw new Error("age must be greater than 0");
//       }
//     },
//   },
//   password: {
//     type: String,
//     trim: true,
//     required: true,
//     validate(value) {
//       if (!value > 6 || !value.includes("password")) {
//         throw new Error("Invalid password field");
//       }
//     },
//   },
// });

// const me = new User({
//   name: "   Emeka   ",
//   password: "12345",
//   email: "MIKE@outLook.compassword  ",
// });

// me.save()
//   .then((res) => {
//     console.log("me", res);
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task1 = new Task({
  description: "Be fucking consistent with coding",
});

task1
  .save()
  .then((res) => {
    console.log("Saved successifully", res);
  })
  .catch((e) => {
    console.log("There was an error saving the document");
  });
