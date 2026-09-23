import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Task from './models/Task.js';

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error.message);
  });

// Test route
app.get('/', (_req, res) => {
  res.json({
    message: 'TaskFlow API is running!',
  });
});

// GET - Get all tasks
app.get('/tasks', async (_req, res) => {
  try {
    const tasks = await Task.find().sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to retrieve tasks',
    });
  }
});

// POST - Create task
app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        error: 'Task title cannot be empty',
      });
    }

    const newTask = await Task.create({
      title: title.trim(),
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to create task',
    });
  }
});

// PUT - Toggle task status
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid task ID',
      });
    }

    const task = await Task.findById(id);

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

    res.status(200).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to update task',
    });
  }
});

// PATCH - Edit task title
app.patch('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid task ID',
      });
    }

    if (!title || title.trim() === '') {
      return res.status(400).json({
        error: 'Task title cannot be empty',
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to edit task',
    });
  }
});

// DELETE - Delete task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid task ID',
      });
    }

    const deletedTask =
      await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        error: 'Task not found',
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to delete task',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
