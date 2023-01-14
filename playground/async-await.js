const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  // the advantage is syntactical
  const sum = await add(1, 2);
  return sum;
};

doWork()
  .then((res) => {
    console.log("result: ", res);
  })
  .catch((e) => console.log(e));
