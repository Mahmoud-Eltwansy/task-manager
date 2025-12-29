import React, { useState, useEffect } from 'react';
import './TaskForm.css';
import { tasksAPI } from '../../api';

function TaskForm({ onTaskAdded, editingTask, onEditComplete }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setStatus(editingTask.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  }, [editingTask]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (editingTask) {
        await tasksAPI.update(editingTask.id, {
          title,
          description,
          status
        });
        onEditComplete();
      } else {
        await tasksAPI.create({
          title,
          description,
          status
        });
        setTitle('');
        setDescription('');
        setStatus('pending');
      }
      onTaskAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
      
      {error && <div className="task-form-error">{error}</div>}
      
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="task-form-input"
      />
      
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="task-form-textarea"
      />
      
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value)}
        className="task-form-select"
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      
      <button 
        type="submit" 
        disabled={loading}
        className="task-form-button"
      >
        {loading ? 'Saving...' : (editingTask ? 'Update Task' : 'Add Task')}
      </button>
    </form>
  );
}

export default TaskForm;
