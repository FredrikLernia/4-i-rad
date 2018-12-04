class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.columns = [
      new Column(1, this),
      new Column(2, this),
      new Column(3, this),
      new Column(4, this),
      new Column(5, this),
      new Column(6, this),
      new Column(7, this),
    ];
    this.players = [
      new Player('Fredrik', 'yellow'),
      new Bot('Trump', 'red')
    ];
    this.turn = 0;
  }

  addBrickInColumn(column) {
    let playerTurn = this.checkWhosTurn();
    if (this.checkWhereToPlaceBrick(column)) {
      column.bricksInsideMe++;
      let id = '#' + column.columnId + '-' + column.bricksInsideMe;
      this.baseEl.find(id).css({'background-color': playerTurn.color});
      this.changePlayer();
    }
  }

  checkWhereToPlaceBrick(column) {
    if (column.bricksInsideMe < 6) { return true; }
    return alert('This column is full');
  }

  checkWhosTurn() {
    return this.players[this.turn];
  }

  changePlayer() {
    if (this.turn === 0) { this.turn++; }
    else { this.turn--; }
  }

}