const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const { name, login, password } = req.body;

    const user = await usersService.createUser({ name, login, password });

    res.json(User.toResponse(user));
  });

router.param('userId', async (req, res, next, userId) => {
  try {
    const user = await usersService.getUser(userId);
    if (!user) {
      return next({ statusCode: 404, message: 'User not found' });
    }
    return next();
  } catch (err) {
    next(err);
    return;
  }
});

router
  .route('/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;

    const user = await usersService.getUser(userId);

    res.json(User.toResponse(user));
  })
  .put(async (req, res) => {
    const { userId } = req.params;
    const { name, login, password } = req.body;

    const user = await usersService.updateUser(userId, {
      name,
      login,
      password
    });

    res.json(User.toResponse(user));
  })
  .delete(async (req, res) => {
    const { userId } = req.params;

    await tasksService.unassignUserFromTasks(userId);
    await usersService.deleteUser(userId);

    res.sendStatus(204);
  });

module.exports = router;
