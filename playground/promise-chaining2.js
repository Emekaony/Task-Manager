require("../src/db/mongoose");
const Task = require("../src/models/tasks");

// Task.findByIdAndRemove("63bfd8ceee29e51895c6e4e2")
//   .then((res) => {
//     console.log(res);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((res2) => {f
//     console.log(res2);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("63bfc816d86a26380550e8ab")
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
