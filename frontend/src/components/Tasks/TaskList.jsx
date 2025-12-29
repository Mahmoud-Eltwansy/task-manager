import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import './TaskList.css';
import { tasksAPI } from '../../api';
import { Helmet } from 'react-helmet-async';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [user, setUser] = useState(null);


    useEffect(() => {
        loadTasks();
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const response = await tasksAPI.getAll();
            setTasks(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await tasksAPI.update(taskId, { status: newStatus });
            setTasks(tasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            ));
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await tasksAPI.delete(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    if (!user && !loading) {
        return <div className="loading-text">Loading user info...</div>;
    }

    return (


        <DefaultLayout user={user}>
            <Helmet>
                <title>Task List</title>
            </Helmet>
            <div className="task-list-wrapper">
                {error && <div className="task-list-error">{error}</div>}

                <TaskForm
                    onTaskAdded={loadTasks}
                    editingTask={editingTask}
                    onEditComplete={() => {
                        setEditingTask(null);
                        loadTasks();
                    }}
                />

                {loading && <p className="loading-text">Loading tasks...</p>}

                {!loading && tasks.length === 0 && (
                    <div className="no-tasks">
                        <p className="no-tasks-icon">📝</p>
                        <p className="no-tasks-text">No tasks yet.</p>
                        <p className="no-tasks-hint">Create one above to get started!</p>
                    </div>
                )}

                {!loading && tasks.length > 0 && (
                    <div className="tasks-grid">
                        {tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onEdit={setEditingTask}
                                onDelete={handleDelete}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}

export default TaskList;