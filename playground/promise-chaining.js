const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// add(1, 2)
//   .then((sum) => {
//     console.log(sum);
//     // we will use promise chaining to solve this problem more elegantly
//     add(sum, 5)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// using promise chaining
add(1, 22)
  .then((res) => {
    console.log(res);
    return add(res, 44);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => console.log(e));
