const mongoose = require("mongoose");
const validator = require("validator");
mongoose.connect("mongodb://127.0.0.1:27018/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//   },
//   age: {
//     type: Number,
//   },
// });

// const me = new User({
//   name: "Nnaemeka",
//   age: 21,
// });

// me.save()
//   .then((res) => {
//     console.log("me", res);
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });
const Task = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
  purpose: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
});

const newTask = new Task({
  description: "This will work",
  purpose: "Nnaemekaonyeokoro@outlook.com",
});

newTask
  .save()
  .then((res) => {
    console.log("New task has been saved", res);
  })
  .catch((err) => {
    console.log(
      "There was an error saving the instance of the Task model",
      err
    );
  });
