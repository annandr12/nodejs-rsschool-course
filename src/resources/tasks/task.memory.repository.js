const Task = require('./task.model');

const tasks = [];

const getBoardTasks = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const createTask = async taskData => {
  const createdTask = new Task(taskData);

  tasks.push(createdTask);

  return createdTask;
};

const getTask = async (boardId, taskId) => {
  return tasks.find(task => {
    return task.boardId === boardId && task.id === taskId;
  });
};

const updateTaskById = async (id, taskData) => {
  let updatedTask = tasks.find(task => task.id === id);
  updatedTask = Object.assign(updatedTask, taskData);

  return updatedTask;
};

const deleteTaskById = async id => {
  const taskIndex = tasks.findIndex(task => task.id === id);

  tasks.splice(taskIndex, 1);
};

const deleteAllBoardTasks = async boardId => {
  const remainTasks = tasks.filter(task => task.boardId !== boardId);
  tasks.splice(0, tasks.length, ...remainTasks);
  return tasks;
};

const unassignUserFromTasks = async userId => {
  tasks.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });

  return;
};

module.exports = {
  getBoardTasks,
  createTask,
  getTask,
  updateTaskById,
  deleteTaskById,
  unassignUserFromTasks,
  deleteAllBoardTasks
};
