const Todo = require('../models/todos');

module.exports = {
  showTodos: async (_req, res, next) => {
    try {
      const todos = await Todo.find();

      if (todos.length === 0) {
        res.status(404).json('No todos Found');
      }

      res.json(todos);
    } catch (err) {
      next(err);
    }
  },
  showSingleTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findById({ _id: id });
      if (todo == null) {
        return res.status(404).json(`No todo with the id ${id}`);
      }
      res.json(todo);
    } catch (err) {
      next(err);
    }
  },
  createTodo: async (req, res, next) => {
    try {
      const { title, body } = req.body;
      const todo = new Todo({ title: title, body: body });
      const result = await todo.save();

      res.json(result);
    } catch (err) {
      next(err);
    }
  },
  updateTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, body } = req.body;
      await Todo.findByIdAndUpdate(
        { _id: id },
        {
          title: title,
          body: body,
        }
      );
      res.json('Data Updated');
    } catch (err) {
      next(err);
    }
  },
  deleteTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Todo.deleteOne({ _id: id });
      res.json('Deleted todo');
    } catch (err) {
      next(err);
    }
  },
};
