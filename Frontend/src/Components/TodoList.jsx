import { AnimatePresence, motion } from "framer-motion";
import TodoItem from "./TodoItem";
import '../styles/TodoList.css'

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0)
    return <p className="empty-msg">✨ No tasks yet — Add one!</p>;

  return (
    <div className="todo-list">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo._id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.35)" }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
