import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm('Are you sure?')) {
            setDeleting(true);
            await onDelete(task.id);
            setDeleting(false);
        }
    };

    const statusColor = {
        'pending': '#ffc107',
        'in_progress': '#17a2b8',
        'done': '#28a745'
    };

    return (
        <div className="task-item">
            <div className="task-content">
                <h4 className="task-title">{task.title}</h4>
                {task.description && <p className="task-description">{task.description}</p>}

                <div className="task-meta">
                    <span
                        className="task-status"
                        style={{ backgroundColor: statusColor[task.status] }}
                    >
                        {task.status}
                    </span>
                    <span className="task-date">
                        {new Date(task.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div className="task-actions">
                <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    className="task-status-select"
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <button
                    onClick={() => onEdit(task)}
                    className="task-edit-btn"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="task-delete-btn"
                >
                    {deleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
