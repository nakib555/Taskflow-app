import React from 'react';

function TaskItem({ task, onToggleTask, onDeleteTask }) {
  const taskId = task._id || task.id;

  return (
    <li className="border-b border-gray-300 py-3 flex justify-between items-center">
      <div>
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={() => onToggleTask(taskId)}
          className="mr-2"
        />

        <span
          className={
            task.status === 'completed'
              ? 'line-through text-gray-400'
              : ''
          }
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDeleteTask(taskId)}
        className="text-red-500"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
