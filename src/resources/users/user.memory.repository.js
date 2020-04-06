const User = require('./user.model');

const users = [];

const getAll = async () => {
  return users;
};

const getUserById = async id => {
  return users.find(user => user.id === id);
};

const updateUserById = async (id, data) => {
  let updatedUser = users.find(user => user.id === id);
  updatedUser = Object.assign(updatedUser, data);
  return updatedUser;
};

const createNewUser = async ({ name, login, password }) => {
  const newUser = new User({ name, login, password });
  users.push(newUser);
  return newUser;
};

const deleteUserById = async id => {
  const userIndex = users.findIndex(user => user.id === id);
  users.splice(userIndex, 1);
};

module.exports = {
  getAll,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById
};
