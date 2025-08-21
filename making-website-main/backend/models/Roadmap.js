const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // 👈 Import the User model

const Roadmap = sequelize.define('Roadmap', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  sector: {
    type: DataTypes.ENUM('government', 'private'),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // table name, not model name
      key: 'id',
    },
  },
}, {
  tableName: 'roadmaps',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

// 🔗 Associations
Roadmap.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Roadmap, { foreignKey: 'user_id' });

module.exports = Roadmap;
