require("../src/db/mongoose");
const User = require("../src/models/user");

// 63bfca6ef4cf3d5700f1bd7a
User.findByIdAndUpdate("63bfce1595c0c97fb9d0e686", { age: 1 })
  .then((res) => {
    console.log(res);
    return User.countDocuments({ age: 1 });
  })
  .then((res2) => {
    console.log(res2);
  })
  .catch((e) => {
    console.log(e);
  });
