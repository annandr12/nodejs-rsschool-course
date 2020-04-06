const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

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
  const user = await usersService.getUser(userId);
  if (!user) {
    res.sendStatus(404);
  }
  next();
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

    await usersService.deleteUser(userId);

    res.sendStatus(204);
  });

module.exports = router;
