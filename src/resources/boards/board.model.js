const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'Column Title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({
    id = uuid(),
    title = 'Board Title',
    columns = [new Column(), new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(item => new Column(item));
  }
}

module.exports = {
  Board,
  Column
};
