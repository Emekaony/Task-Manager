const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27018/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const me = new User({
  name: "Nnaemeka",
  age: 21,
});

me.save()
  .then((res) => {
    console.log("me", res);
  })
  .catch((err) => {
    console.log("error", err);
  });
