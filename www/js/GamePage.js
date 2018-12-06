class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({
      'click .restart': 'restartGame'
    });
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
      new HumanPlayer('Fredrik', 'yellow'),
      new Bot('Trump', 'red')
    ];
    this.turn = 0;
  }
  restartGame() {

  }

  addBrickInSlot(column) {
    let playerTurn = this.checkWhosTurn();
    if (this.checkIfColumnIsFull(column)) {
      column.bricksInsideMe++;
      let slot = column.slots[column.slotIndex];
      slot.brickInside.push(new Brick(playerTurn.color));
      this.winChecker(playerTurn.color);
      this.changePlayer();
      this.render();
      column.slotIndex--;
      playerTurn = this.checkWhosTurn();
      this.makeRandomMove(playerTurn);
      this.winChecker(playerTurn.color);
    }
  }

  winChecker(color) {

    let winCounter = 0;
    for (let j = 0; j < 7; j++) {
      winCounter = 0;
      for (let i = 5; i >= 0; i--) {
        if (this.columns[j].slots[i].brickInside[0] !== undefined) {
          if (this.columns[j].slots[i].brickInside[0].color === color) {

            winCounter++;
          }
        }
        if (this.columns[j].slots[i].brickInside[0] !== undefined) {
          if (this.columns[j].slots[i].brickInside[0].color !== color) {

            winCounter = 0;
          }
        }

        if (winCounter === 4) {
          alert(color + " wins");
          break;
        }
      }
    }

    for (let i = 5; i >= 0; i--) {
      winCounter = 0;
      for (let j = 0; j < 7; j++) {
        if (this.columns[j].slots[i].brickInside[0] !== undefined) {
          if (this.columns[j].slots[i].brickInside[0].color === color) {

            winCounter++;
          }
        }
        if (this.columns[j].slots[i].brickInside[0] !== undefined) {
          if (this.columns[j].slots[i].brickInside[0].color !== color) {

            winCounter = 0;
          }
        }

        if (winCounter === 4) {
          alert(color + " wins");
          break;
        }
      }
    }
  }


  makeRandomMove(playerTurn) {
    let randCol;
    let validMoveChecker = false;
    while (validMoveChecker === false) {
      randCol = this.players[1].makeRandomizedMove();
      if (this.botCheckIfColumnIsFull(this.columns[randCol]) === true) {
        validMoveChecker = true;
      }
    }

    this.columns[randCol].bricksInsideMe++;
    let slot = this.columns[randCol].slots[this.columns[randCol].slotIndex];
    slot.brickInside.push(new Brick(playerTurn.color));
    this.changePlayer();
    this.render();
    this.columns[randCol].slotIndex--;
    validMoveChecker = false;
  }

  checkIfColumnIsFull(column) {
    if (column.bricksInsideMe < 6) { return true; }
    else {
      alert('This column is full');
      return false;
    }
  }

  botCheckIfColumnIsFull(column) {
    if (column.bricksInsideMe < 6) { return true; }
    else {
      return false;
    }
  }

  checkWhosTurn() {
    return this.players[this.turn];
  }

  changePlayer() {
    if (this.turn === 0) { this.turn++; }
    else { this.turn--; }
  }

}