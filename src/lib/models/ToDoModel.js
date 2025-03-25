// src/lib/models/ToDoModel.js
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // corrected to plural 'timestamps'
});

// Check if model already exists, otherwise create it
const TodoModel = mongoose.models.todo || mongoose.model('todo', todoSchema);

export default TodoModel;