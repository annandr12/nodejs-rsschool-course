const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUserById(id);

const updateUser = (id, data) => usersRepo.updateUserById(id, data);

const createUser = user => usersRepo.createNewUser(user);

const deleteUser = id => usersRepo.deleteUserById(id);

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
