const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");
const homeRouter = require("./routers/home");
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
