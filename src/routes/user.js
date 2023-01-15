const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/", (req, res) => {
  res.send("Home, but from the users router");
});

// resource endpoint for user creation
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// allow users to log in
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

// reads the whole users collection and sends it to the client
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).send();
    }
    res.status(201).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

// gets a user with a specific id - Note the difference between a route param and a request param
// this here is a request parameter
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const foundUser = await User.findById(_id);
    if (!foundUser) {
      return res.status(404).send();
    }
    res.send(foundUser);
  } catch (e) {
    res.status(500).send(`Could not find user with id: ${_id}`);
  }
});

// use patch to update a resource
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "email", "password"];
  const isValidUpdate = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  // if the update is now allowed, send a 404 and stop there
  if (!isValidUpdate) {
    return res.status(400).send("Attempting to perform an invalid update");
  }

  try {
    // setting new: true will return the new user with the updates
    const user = await User.findById(req.params.id);

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Error deleting user");
  }
});

module.exports = router;
