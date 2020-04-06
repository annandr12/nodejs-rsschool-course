const { Board, Column } = require('./board.model');

const boards = [];

const getAllBoards = async () => {
  return boards;
};

const createBoard = async board => {
  const { title, columns } = board;

  const createdBoard = new Board({
    title,
    columns: columns.map(column => new Column(column))
  });

  boards.push(createdBoard);
  return createdBoard;
};

const updateBoardById = async (id, boardData) => {
  let updatedBoard = boards.find(board => board.id === id);

  updatedBoard = Object.assign(updatedBoard, boardData);

  return updatedBoard;
};

const deleteBoardById = async id => {
  const boardIndex = boards.findIndex(user => user.id === id);

  boards.splice(boardIndex, 1);
};

const getBoardById = async id => {
  return boards.find(board => board.id === id);
};

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoardById,
  deleteBoardById
};
