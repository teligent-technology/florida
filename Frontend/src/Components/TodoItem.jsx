import { motion } from "framer-motion";
import '../styles/TodoItem.css'

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <motion.div
      className={`todo-card ${todo.completed ? "done" : ""}`}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <span className="todo-title" onClick={() => onToggle(todo._id)}>
        {todo.title}
      </span>
      <motion.button
        className="delete-btn"
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onDelete(todo._id)}
      >
        ❌
      </motion.button>
    </motion.div>
  );
}
