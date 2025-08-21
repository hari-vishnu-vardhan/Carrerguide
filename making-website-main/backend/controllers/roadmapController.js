const Roadmap = require('../models/Roadmap');

// @desc    Get all roadmaps
// @route   GET /api/roadmaps
// @access  Public
exports.getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.findAll({ order: [['created_at', 'DESC']] });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roadmaps', error: error.message });
  }
};

// @desc    Create a new roadmap
// @route   POST /api/roadmaps
// @access  Private
exports.createRoadmap = async (req, res) => {
  const { title, description, sector } = req.body;

  if (!title || !sector) {
    return res.status(400).json({ message: 'Title and sector are required' });
  }

  try {
    const newRoadmap = await Roadmap.create({ title, description, sector });
    res.status(201).json(newRoadmap);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create roadmap', error: error.message });
  }
};

// @desc    Update an existing roadmap
// @route   PUT /api/roadmaps/:id
// @access  Private
exports.updateRoadmap = async (req, res) => {
  const { id } = req.params;
  const { title, description, sector } = req.body;

  try {
    const roadmap = await Roadmap.findByPk(id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });

    roadmap.title = title || roadmap.title;
    roadmap.description = description || roadmap.description;
    roadmap.sector = sector || roadmap.sector;

    await roadmap.save();

    res.json({ message: 'Roadmap updated successfully', roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update roadmap', error: error.message });
  }
};

// @desc    Delete a roadmap
// @route   DELETE /api/roadmaps/:id
// @access  Private
exports.deleteRoadmap = async (req, res) => {
  const { id } = req.params;

  try {
    const roadmap = await Roadmap.findByPk(id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });

    await roadmap.destroy();
    res.json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete roadmap', error: error.message });
  }
};
