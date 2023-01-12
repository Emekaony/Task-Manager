const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27018/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
