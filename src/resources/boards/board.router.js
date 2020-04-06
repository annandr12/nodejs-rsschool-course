const router = require('express').Router();
// const Board = require('./board.model');
const boardService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardService.getAllBoards();

    res.json(boards);
  })
  .post(async (req, res) => {
    const { title, columns } = req.body;

    const board = await boardService.createBoard({ title, columns });

    res.json(board);
  });

router.param('boardId', async (req, res, next, boardId) => {
  const board = await boardService.getBoard(boardId);
  if (!board) {
    res.sendStatus(404);
  }
  next();
});

router
  .route('/:boardId')
  .get(async (req, res) => {
    const { boardId } = req.params;

    const board = await boardService.getBoard(boardId);

    res.json(board);
  })
  .put(async (req, res) => {
    const { boardId } = req.params;
    const { title, columns } = req.body;

    const board = await boardService.updateBoard(boardId, {
      title,
      columns
    });

    res.json(board);
  })
  .delete(async (req, res) => {
    const { boardId } = req.params;

    await boardService.deleteBoard(boardId);

    res.sendStatus(204);
  });

module.exports = router;
