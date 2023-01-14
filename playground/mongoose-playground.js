require("../src/db/mongoose");
const User = require("../src/models/user");

// // 63bfca6ef4cf3d5700f1bd7a
// User.findByIdAndUpdate("63bfce1595c0c97fb9d0e686", { age: 1 })
//   .then((res) => {
//     console.log(res);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((res2) => {
//     console.log(res2);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// this finds a user by id updates the age by the passed age value
// also returns the number of users with that age
const updateAgeAndCount = async (id, age) => {
  await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("63c0656f10d330370de9b602", 30)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => console.log(e));
