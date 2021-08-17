const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);

module.exports = mongoose.model('todos', todosSchema);
