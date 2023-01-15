const express = require("express");
const Task = require("../models/tasks");
const router = new express.Router();

// MAKE SURE TO SWITCH FROM `app` TO `router`

// resource endpoint for task creation
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks/", async (req, res) => {
  try {
    const result = await Task.find({});
    if (!result) {
      return res.status(404).send();
    }
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("No user with that id exists");
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

// use patch to update a resource
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdate = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  // if the update is now allowed, send a 404 and stop there
  if (!isValidUpdate) {
    return res.status(400).send("Attempting to perform an invalid update");
  }

  try {
    // setting new: true will return the new user with the updates routerlied
    const task = await Task.findById(req.params.id);

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send("User does not exist");
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send("Error deleting user");
  }
});

module.exports = router;
