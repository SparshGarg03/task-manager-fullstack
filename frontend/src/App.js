// Task Manager - React Frontend Application.

import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      if (result.success) {
        setTasks(result.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setEditingId(null);
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      setFormData({ title: '', description: '', status: 'Pending' });
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    try {
      await fetch(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, status: newStatus })
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Task Manager</h1>
          <p>Manage your daily tasks efficiently</p>
        </header>

        <div className="form-container">
          <h2>{editingId ? 'Edit Task' : 'Add New Task'}</h2>
          <div className="form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="button-group">
              <button onClick={handleSubmit} className="btn btn-primary">
                {editingId ? 'Update Task' : 'Add Task'}
              </button>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ title: '', description: '', status: 'Pending' });
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="tasks-container">
          <h2>Tasks ({tasks.length})</h2>
          {loading ? (
            <p className="text-center">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center">No tasks yet. Add your first task above!</p>
          ) : (
            <div className="tasks-list">
              {tasks.map((task) => (
                <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
                  <div className="task-content">
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <span className={`status-badge ${task.status.toLowerCase()}`}>
                        {task.status}
                      </span>
                    </div>
                    {task.description && <p>{task.description}</p>}
                  </div>
                  <div className="task-actions">
                    <button
                      onClick={() => toggleStatus(task)}
                      className="btn-icon btn-success"
                      title={task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                    >
                      {task.status === 'Completed' ? '↻' : '✓'}
                    </button>
                    <button
                      onClick={() => handleEdit(task)}
                      className="btn-icon btn-edit"
                      title="Edit Task"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="btn-icon btn-delete"
                      title="Delete Task"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;