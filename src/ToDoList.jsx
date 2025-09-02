import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, newTask]);
      setNewTask("");
    }
  }
 
  function deleteTask(index) {
    const taskToDelete = tasks[index];
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setDeletedTasks(d => [...d, taskToDelete]);
  }

  function startEdit(index) {
    setEditIndex(index);
    setEditValue(tasks[index]);
  }

  function saveEdit(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editValue;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  }

  function restoreTask(index) {
    const taskToRestore = deletedTasks[index];
    setTasks(t => [...t, taskToRestore]);
    setDeletedTasks(d => d.filter((_, i) => i !== index));
  }

  return (
    <div className='to-do-list'>
      <h1>To-Do List</h1>
      <div>
        <input
          type='text'
          placeholder='Enter a task...'
          value={newTask}
          onChange={handleInputChange}
        />
        <button className='add-button' onClick={addTask}>
          Add
        </button>
      </div>

      
      <ol>
        {tasks.map((task, index) =>
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type='text'
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button
                  className='add-button'
                  onClick={() => saveEdit(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className='text'>{task}</span>
                <button
                  className='edit-button'
                  onClick={() => startEdit(index)}
                >
                  Edit
                </button>
                <button
                  className='delete-button'
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        )}
      </ol>

      
      {deletedTasks.length > 0 && (
        <div className='deleted-section'>
          <h2>Deleted Items</h2>
          <ul className='del'>
            {deletedTasks.map((task, index) => (
              <li key={index} className="deleted-item">
                {task}
                <button
                  className='restore-button'
                  onClick={() => restoreTask(index)}
                >
                  Restore
                </button>
              </li> 
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ToDoList;


 