import { Todo } from "../models/todoModels/todo.model.js";

async function alltodos(req, res) {
  //    const user = req.user

  const { userId } = req.body;
    console.log(userId)
  if (!userId) {
    res.status(401).send({
      message: "user is not authenticated",
    });
  }
  try {
    const allTodos = await Todo.find({ createdBy: userId });

    res.status(200).send({
      message: "All todo retrieve",
      allTodos,
    });
  } catch (error) {
    console.log("something went wrong while retrieving todos");
    res.status(500).send({
      message: "something went wrong",
    });
  }
}

async function addtodo(req, res) {
  const { content,userId } = req.body;

  // const user = req.user;

  try {
    const todo = await Todo.create({
      content,
      createdBy: userId,
    });
    if (!todo) throw new Error("something went wrong while saving todo");
    res.status(201).send({
      message: "Todo has been added successfully!",
    });
  } catch (error) {
    console.log("something went wrong while saving todo", error.message);
    res.status(500).send({
      message: "Failed to add todo",
      error: error.message,
    });
  }
}

async function updatetodo(req, res) {
  const { todoId, content } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { content },
      { new: true }
    );
    if (!updatedTodo) throw new Error("failed to update Todo");
    res.status(200).send({
      message: "Todo Updated successfully!",
      updatedTodo,
    });
  } catch (error) {
    console.log("something went wrong while updating Todo", error);
    res.status(500).send({
      message: "failed to update Todo",
    });
  }
}

async function deletetodo(req, res) {
  const { todoId } = req.body;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo)
      throw new Error("something went wrong while deleting Todo");

    res.status(200).send({
      message: "Todo successfully deleted",
      deletedTodo,
    });
  } catch (error) {
    console.log("something went wrong while deleting Todo", error);
    res.status(500).send({
      message: "something went wrong while deleting Todo",
    });
  }
}

export { alltodos, addtodo, updatetodo, deletetodo };
