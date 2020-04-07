const router = require('express').Router();
const taskService = require('./task.service');
const boardService = require('../boards/board.service');

router.param('boardId', async (req, res, next, boardId) => {
  const board = await boardService.getBoard(boardId);
  if (!board) {
    res.sendStatus(404);
  }
  next();
});

router.param('taskId', async (req, res, next, taskId) => {
  const { boardId } = req.params;

  const task = await taskService.getTask(boardId, taskId);
  if (!task) {
    res.sendStatus(404);
  }
  next();
});

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await taskService.getBoardTasks(boardId);
    res.json(tasks);
  })
  .post(async (req, res) => {
    const { boardId } = req.params;

    const task = await taskService.createTask(
      Object.assign(req.body, {
        boardId
      })
    );
    res.json(task);
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const { boardId, taskId } = req.params;

    const task = await taskService.getTask(boardId, taskId);

    res.json(task);
  })
  .put(async (req, res) => {
    const { taskId } = req.params;

    const task = await taskService.updateTask(taskId, req.body);

    res.json(task);
  })
  .delete(async (req, res) => {
    const { taskId } = req.params;

    await taskService.deleteTask(taskId);

    res.sendStatus(204);
  });

module.exports = router;
