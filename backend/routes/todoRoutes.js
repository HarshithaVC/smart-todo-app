import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo
} from "../controllers/todoControllers.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTodos);
router.post("/", protect, createTodo);
router.delete("/:id", protect, deleteTodo);
router.put("/:id", protect, updateTodo);

export default router;