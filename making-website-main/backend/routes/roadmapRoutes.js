const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');

// @route   GET /api/roadmaps
router.get('/', async (req, res) => {
  try {
    const roadmaps = await Roadmap.findAll();
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/roadmaps
router.post('/', async (req, res) => {
  const { title, description, sector } = req.body;
  try {
    const newRoadmap = await Roadmap.create({ title, description, sector });
    res.status(201).json(newRoadmap);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
