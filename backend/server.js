import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Task from './models/Task.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/taskflow')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API is running' });
});

// GET - Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tasks' });
  }
});

// POST - Add task
app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        error: 'Title is required',
      });
    }

    const task = await Task.create({
      title: title.trim(),
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to add task',
    });
  }
});

// PUT - Complete / Pending
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    task.status =
      task.status === 'completed'
        ? 'pending'
        : 'completed';

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update task',
    });
  }
});

// PATCH - Edit task
app.patch('/tasks/:id', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        error: 'Title is required',
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title: title.trim() },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to edit task',
    });
  }
});

// DELETE - Delete task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    res.json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete task',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
