import { useState } from "react";
import '../styles/TodoForm.css'

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title });
    setTitle("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="✨ Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="animated-input"
        />
        <button type="submit" className="fancy-btn">
          ➕ Add Task
        </button>
      </div>
    </form>
  );
}
