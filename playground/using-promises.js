const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // if things go bad, then call reject
    // reject("there was an error");

    // if things go well, call resolved
    resolve([7, 4, 1]);
  }, 1000);
});

doWorkPromise
  // call then when there's success
  .then((result) => {
    console.log("Successful", result);
  })
  // call catch to take care of when there's an error
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("This runs whether or not it resolves or rejects");
  });
