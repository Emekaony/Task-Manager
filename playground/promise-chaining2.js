require("../src/db/mongoose");
const Task = require("../src/models/tasks");

Task.findByIdAndRemove("63bfd8ceee29e51895c6e4e2")
  .then((res) => {
    console.log(res);
    return Task.countDocuments({ completed: false });
  })
  .then((res2) => {
    console.log(res2);
  })
  .catch((e) => {
    console.log(e);
  });
