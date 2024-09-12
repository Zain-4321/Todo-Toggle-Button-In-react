import React, { useState } from 'react';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditing(index);
    setEditText(todos[index]);
  };

  const handleSaveEdit = (index) => {
    setTodos(todos.map((todo, i) => i === index ? editText : todo));
    setEditing(null);
    setEditText('');
  };

  return (
    <div
      className={`container ${darkMode ? 'dark-mode' : ''}`}
    >
      <h1>Todo App</h1>
      <button onClick={handleToggle}>
        {darkMode ? 'Turn on the light' : 'Turn off the light'}
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className={darkMode ? 'dark-input' : ''}
        />
        <button type="submit" className={darkMode ? 'dark-button' : ''}>
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editing === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className={darkMode ? 'dark-input' : ''}
              />
            ) : (
              todo
            )}
            {editing === index ? (
              <button onClick={() => handleSaveEdit(index)} className={darkMode ? 'dark-button' : ''}>
                Save
              </button>
            ) : (
              <button onClick={() => handleEdit(index)} className={darkMode ? 'dark-button' : ''}>
                Edit
              </button>
            )}
            <button onClick={() => handleDelete(index)} className={darkMode ? 'dark-button' : ''}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;