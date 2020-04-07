const taskRepo = require('./task.memory.repository');

const getBoardTasks = boardId => taskRepo.getBoardTasks(boardId);

const createTask = task => taskRepo.createTask(task);

const getTask = (boardId, taskId) => taskRepo.getTask(boardId, taskId);

const updateTask = (id, taskData) => taskRepo.updateTaskById(id, taskData);

const deleteTask = id => taskRepo.deleteTaskById(id);

const unassignUserFromTasks = userId => taskRepo.unassignUserFromTasks(userId);

const deleteAllBoardTasks = boardId => taskRepo.deleteAllBoardTasks(boardId);

module.exports = {
  getBoardTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  unassignUserFromTasks,
  deleteAllBoardTasks
};
