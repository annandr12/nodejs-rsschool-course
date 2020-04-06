const boardRepo = require('./board.memory.repository');

const getAllBoards = () => boardRepo.getAllBoards();

const createBoard = board => boardRepo.createBoard(board);

const updateBoard = (id, boardData) => boardRepo.updateBoardById(id, boardData);

const getBoard = id => boardRepo.getBoardById(id);

const deleteBoard = id => boardRepo.deleteBoardById(id);

module.exports = {
  getAllBoards,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard
};
