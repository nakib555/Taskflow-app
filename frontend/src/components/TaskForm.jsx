import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      return;
    }

    onAddTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task"
        className="border border-gray-400 p-2 flex-1"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2"
      >
        Add
      </button>
    </form>
  );
}

export default TaskForm;
