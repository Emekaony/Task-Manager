const express = require("express");
require("./db/mongoose");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

// allows express parse incoming data
app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      console.log("An error occured", e);
    });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
