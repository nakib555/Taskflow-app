# TaskFlow Manager 📋

A clean, beginner-friendly full-stack Task Management application built using the **MERN** stack (MongoDB, Express, React, Node.js) styled with **Tailwind CSS**.

---

## 📁 Project Structure

```text
taskflow-app/
├── backend/
│   ├── models/
│   │   └── Task.js          # Mongoose Task Schema
│   ├── .gitignore           # Backend git ignore
│   ├── package.json         # Backend dependencies & scripts
│   └── server.js            # Express server & REST API endpoints
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx # Component for adding new tasks
│   │   │   ├── TaskItem.jsx # Single task item with toggle/delete
│   │   │   └── TaskList.jsx # Task list with All/Pending/Completed filters
│   │   ├── App.jsx          # Main React component & API calls
│   │   ├── index.css        # Tailwind CSS imports
│   │   └── main.jsx         # React application entry point
│   ├── .gitignore           # Frontend git ignore
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies & scripts
│   ├── postcss.config.js    # PostCSS configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── vite.config.js       # Vite configuration
├── .gitignore               # Root git ignore
└── README.md                # Project documentation & setup instructions
```

---

## 🚀 Features

- **Add Tasks**: Quickly create tasks with input validation.
- **Toggle Status**: Mark tasks as `pending` or `completed` with a single click.
- **Filter Tasks**: Switch between **All**, **Pending**, and **Completed** views.
- **Task Counters**: Real-time summary of total, pending, and completed tasks.
- **Delete Tasks**: Remove tasks from database with instant UI update.
- **Clean Human Design**: Simple, beginner-friendly design with clear indicators and smooth interactions.
- **Full REST API**: Clean Express backend with MongoDB persistence.

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended) -> [Download Node.js](https://nodejs.org/)
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

---

## 💻 Step-by-Step Setup & Running Guide

### 1. Start MongoDB
Make sure your MongoDB server is running. If installed locally via Homebrew or Windows Service:
```bash
# MacOS (Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Windows
# MongoDB runs as a Windows Service automatically or via 'mongod' command
```

---

### 2. Setup & Run the Backend

Open a terminal window:

```bash
# Navigate to the backend directory
cd taskflow-app/backend

# Install dependencies
npm install

# Run the server
npm start
```
> The backend server will run at `http://localhost:5000` and connect to MongoDB at `mongodb://127.0.0.1:27017/taskflow`.

*(Optional: Run with `npm run dev` if you want auto-restart on code changes using nodemon)*

---

### 3. Setup & Run the Frontend

Open a **new separate terminal window**:

```bash
# Navigate to the frontend directory
cd taskflow-app/frontend

# Install dependencies
npm install

# Run the Vite development server
npm run dev
```
> Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal).

---

## 📡 REST API Reference

The backend API is served at `http://localhost:5000`:

| Method | Endpoint      | Description                               | Request Body |
|--------|---------------|-------------------------------------------|--------------|
| `GET`  | `/tasks`      | Retrieve all tasks sorted by newest first | *None*       |
| `POST` | `/tasks`      | Create a new task                         | `{"title": "Task title"}` |
| `PUT`  | `/tasks/:id`  | Toggle task status (`pending` <-> `completed`) | *None*   |
| `DELETE`| `/tasks/:id` | Delete a task by ID                       | *None*       |

---

## 🌿 Git Submission Commands

To initialize git and commit your work:

```bash
cd taskflow-app
git init
git add .
git commit -m "TaskFlow Manager project according to assessment specification"
```

---

## 💡 Notes for Beginners
- If you see a connection error banner in the browser, verify that your backend terminal says:
  `Server running on http://localhost:5000` and `MongoDB Connected Successfully!`.
- The database is created automatically when the first task is inserted.
