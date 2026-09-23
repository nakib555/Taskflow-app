import React, { useState } from 'react';

function TaskItem({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) {
  const taskId = task._id || task.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleEdit = () => {
    if (editTitle.trim() === '') {
      return;
    }

    onEditTask(taskId, editTitle.trim());
    setIsEditing(false);
  };

  return (
    <li className="border-b border-gray-300 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={() => onToggleTask(taskId)}
        />

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border border-gray-400 p-1 flex-1"
          />
        ) : (
          <span
            className={
              task.status === 'completed'
                ? 'line-through text-gray-400'
                : ''
            }
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2 ml-4">
        {isEditing ? (
          <button
            onClick={handleEdit}
            className="text-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDeleteTask(taskId)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
