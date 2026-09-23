import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://127.0.0.1:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        setTasks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (title) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      const newTask = await response.json();

      if (response.ok) {
        setTasks((currentTasks) => [newTask, ...currentTasks]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
      });

      const updatedTask = await response.json();

      if (response.ok) {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            (task._id || task.id) === id ? updatedTask : task
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (id, title) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      const updatedTask = await response.json();

      if (response.ok) {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            (task._id || task.id) === id ? updatedTask : task
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks((currentTasks) =>
          currentTasks.filter(
            (task) => (task._id || task.id) !== id
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Task Manager
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Simple MERN Task App
        </p>

        <TaskForm onAddTask={addTask} />

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
