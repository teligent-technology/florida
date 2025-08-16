import { useEffect, useState } from "react";
import api from "./api";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ Backend keep-alive ping
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://florida-backend.onrender.com/api/todos/health")
        .then(() => console.log("✅ Backend pinged"))
        .catch(() => console.log("❌ Ping failed"));
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const addTodo = async (todo) => {
    const res = await api.post("/todos", todo);
    setTodos([res.data.data, ...todos]);
  };

  const toggleTodo = async (id) => {
    const res = await api.patch(`/todos/${id}/toggle`);
    setTodos(todos.map((t) => (t._id === id ? res.data.data : t)));
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div className="app-bg">
      <div className="app-wrapper">
        <h1 className="app-title">✅ My Animated Todo List</h1>
        <p className="app-subtitle">Organize your tasks with style ✨</p>
        <TodoForm onCreate={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}
