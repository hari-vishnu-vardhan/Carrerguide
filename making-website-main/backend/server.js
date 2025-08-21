const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const { connectDB, sequelize } = require('./config/db'); 

// Load all models here
const User = require('./models/User');
const Roadmap = require('./models/Roadmap'); // ✅ Add this

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/roadmaps', roadmapRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🚀 Tech Career Guide API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();                     // Connect to DB
    await sequelize.sync({ alter: true }); // Sync models
    console.log('✅ Models synchronized with MySQL');

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error.message);
    process.exit(1);
  }
};

startServer();
