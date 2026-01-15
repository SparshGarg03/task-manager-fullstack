# Task Manager - Full Stack Application

A simple task management application built with React.js and Node.js.

## Features
- ✅ Add new tasks
- 📝 View all tasks
- ✏️ Update existing tasks
- 🗑️ Delete tasks
- ✓ Toggle task status (Pending/Completed)
- 📱 Responsive design

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: In-memory storage

## Setup Instructions

### Backend Setup
1. Navigate to backend folder:
```bash
   cd backend
```

2. Install dependencies:
```bash
   npm install
```

3. Start the server:
```bash
   npm start
```
   Server runs on `http://localhost:5000`

### Frontend Setup
1. Navigate to frontend folder:
```bash
   cd frontend
```

2. Install dependencies:
```bash
   npm install
```

3. Start the React app:
```bash
   npm start
```
   App runs on `http://localhost:3000`

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Project Structure
```
task-manager/
├── backend/
│   ├── server.js       # Express server
│   ├── db.js          # In-memory database
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js     # Main React component
│   │   ├── App.css    # Styles
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

## Development
- Backend uses `nodemon` for auto-restart
- Frontend uses React hot reload


## 📸 Screenshots

## Author
Sparsh Garg

## 📧 Contact
- **Email:** sparshgarg1377@gmail.com
- **GitHub:** SparshGarg03