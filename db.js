const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/endtoend', {
  logging: false,
});

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Task = db.define('tasks', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

const Session = db.define('sessions', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

User.hasOne(Task);
Task.belongsTo(User);

User.hasOne(Session);
Session.belongsTo(User);

module.exports = {
  db,
  User,
  Task,
  Session,
};
