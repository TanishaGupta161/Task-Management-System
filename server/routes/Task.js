const router = require("express").Router();
const mongoose = require("mongoose");
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken = require("../authentication/auth");

// CREATE TASK
router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid token: user ID missing or invalid" });
    }

    const newTask = new Task({
      title,
      desc,
      user: new mongoose.Types.ObjectId(userId), // ensure ObjectId
    });

    const savedTask = await newTask.save();

    await User.findByIdAndUpdate(userId, {
      $push: { tasks: savedTask._id },
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: savedTask,
    });
  } catch (error) {
    console.error("Error during task creation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET ALL TASKS
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid token: user ID missing or invalid" });
    }

    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//DeLETE TASK
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!task) {
      return res
        .status(404)
        .json({
          message: "Task not found or you do not have permission to delete it",
        });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { tasks: taskId },
    });

    return res.status(200).json({
      message: "Task deleted successfully",
      task,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//UPDATE TASK
router.put("/update-task/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, desc } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, desc },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({
          message: "Task not found or you do not have permission to update it",
        });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Update Important Status
router.put("/update-important/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res
        .status(404)
        .json({
          message: "Task not found or you do not have permission to update it",
        });
    }
    task.important = !task.important;
    const updatedTask = await task.save();
    return res.status(200).json({
      message: "Task important status updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task important status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Update Complete Status
router.put("/update-complete/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res
        .status(404)
        .json({
          message: "Task not found or you do not have permission to update it",
        });
    }
    task.complete = !task.complete;
    const updatedTask = await task.save();
    return res.status(200).json({
      message: "Task complete status updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task complete status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Update incomplete Status
router.put("/update-incomplete/:id", authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res
        .status(404)
        .json({
          message: "Task not found or you do not have permission to update it",
        });
    }
    task.complete = false; // Set complete to false
    const updatedTask = await task.save();
    return res.status(200).json({
      message: "Task marked as incomplete successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error marking task as incomplete:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
