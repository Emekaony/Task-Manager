const doWorkCallback = (cb) => {
  setTimeout(() => {
    // Nothing stops you from calling the callback twice which is BAD
    // use promises instead of callbacks to avoid pesky bugs/mistakes
    cb("There was an error!", undefined);
    cb(undefined, "There was a success");
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);
});
