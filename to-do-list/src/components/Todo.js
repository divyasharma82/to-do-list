import React, { useEffect, useState } from 'react';
import './todo.css';

const Todo = () => {
  //state for input values and todo list
  const [inputValue, setInputValule] = useState('');
  const [todos, setTodos] = useState([]);

  //load todos from localstorage when component mounts
  useEffect(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(storedTodos);
    } catch (error) {
      // Handle parsing error, e.g., by setting default value for todos
      console.error('Error parsing todos from localStorage:', error);
      setTodos([]);
    }
  }, []);

  //save task to localStroge whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  //handle Form Submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      return; //Prevent adding empty todos
    }
    const newTodo = {
      id: Date.now(),
      isCompleted: false,
      text: inputValue,
    };
    //add newTodo to the beginning of the todos array
    setTodos([newTodo, ...todos]);
    setInputValule(''); //clear the input value
  };

  //handle todo item deletion by filtering item
  const handleDelete = (id) => {
    const updatedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodo);
  };

  //handle marking completed task
  const handleTaskComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter todo..."
          value={inputValue}
          onChange={(e) => setInputValule(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div
              className={`todo-item  ${todo.isCompleted ? 'completed' : ''}`}
            >
              <p>{todo.text}</p>
              <button
                className="btn btn-del"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-complete"
                onClick={() => handleTaskComplete(todo.id)}
              >
                Completed
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
