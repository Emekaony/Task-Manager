const express = require("express");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/tasks");
const homeRouter = require("./routes/home");
require("./db/mongoose");

// set up app and PORT
const app = express();
const port = process.env.PORT || 3000;

// allows express parse incoming data
app.use(express.json());

// allows express use routers
// the order here still matters especially when you have the same route from different files
app.use(userRouter);
app.use(taskRouter);
app.use(homeRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
    expiresIn: "2 days",
  });
  console.log(token);

  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunction();
