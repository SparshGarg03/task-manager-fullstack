// Simple in-memory database
let tasks = [
  {
    id: 1,
    title: 'Sample Task',
    description: 'This is a sample task',
    status: 'Pending'
  }
];

let nextId = 2;

const db = {
  getAllTasks: () => tasks,
  
  getTaskById: (id) => tasks.find(task => task.id === parseInt(id)),
  
  createTask: (taskData) => {
    const newTask = {
      id: nextId++,
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status || 'Pending'
    };
    tasks.push(newTask);
    return newTask;
  },
  
  updateTask: (id, taskData) => {
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index] = {
      ...tasks[index],
      ...taskData,
      id: parseInt(id)
    };
    return tasks[index];
  },
  
  deleteTask: (id) => {
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  }
};

module.exports = db;