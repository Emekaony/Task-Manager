const express = require("express");
const User = require("./models/user");
const Task = require("./models/tasks");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

// allows express parse incoming data
app.use(express.json());

// resource endpoint for user creation
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      // status code for client error
      res.status(400).send(e);
    });
});

// reads the whole users collection and sends it to the client
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send("Internal server error");
    });
});

// gets a user with a specific id - Note the difference between a route param and a request param
// this here is a route parameter
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      res.send(result);
    })
    .catch((e) => {
      // console.log(e);
      res.status(500).send("Error finding the user with id ", _id);
    });
});

// resource endpoint for task creation
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/tasks/", (req, res) => {
  Task.find({})
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      res.send(result);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then((result) => {
      if (!result) {
        return res.status(404).send();
      }
      res.send(result);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
