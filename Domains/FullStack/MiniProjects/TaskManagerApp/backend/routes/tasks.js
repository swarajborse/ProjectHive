const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Get all tasks for current user
router.get('/', async (req, res) => {
  try {
    const { completed, priority, sort } = req.query;
    
    // Build filter
    const filter = { user: req.userId };
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    if (priority) {
      filter.priority = priority;
    }

    // Build sort
    let sortOption = { createdAt: -1 };
    if (sort === 'dueDate') {
      sortOption = { dueDate: 1, createdAt: -1 };
    } else if (sort === 'priority') {
      sortOption = { priority: -1, createdAt: -1 };
    }

    const tasks = await Task.find(filter).sort(sortOption);
    
    res.json({
      count: tasks.length,
      tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Get single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id,
      user: req.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Error fetching task' });
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      user: req.userId
    });

    await task.save();
    
    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['title', 'description', 'completed', 'priority', 'dueDate'];
    
    // Filter only allowed fields
    const validUpdates = {};
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        validUpdates[field] = updates[field];
      }
    });

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      validUpdates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Toggle task completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = !task.completed;
    await task.save();

    res.json({
      message: 'Task toggled successfully',
      task
    });
  } catch (error) {
    console.error('Toggle task error:', error);
    res.status(500).json({ error: 'Error toggling task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      message: 'Task deleted successfully',
      task
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;
