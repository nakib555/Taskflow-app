import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) {
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    return true;
  });

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => setFilter('all')} className="mr-2">
          All
        </button>

        <button onClick={() => setFilter('pending')} className="mr-2">
          Pending
        </button>

        <button onClick={() => setFilter('completed')}>
          Completed
        </button>
      </div>

      <p className="mb-3">Total tasks: {tasks.length}</p>

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task._id || task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
