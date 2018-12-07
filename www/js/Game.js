class Game extends Component {

  constructor() {
    super();
    this.addEvents({
      'click .restart': 'newGame'
    });
    this.newGame();
    this.players = [
      new HumanPlayer('Fredrik', 'yellow'),
      new Bot('Trump', 'red')
    ];
    this.turn = 0;
  }

  newGame() {
    this.turn = 0;
    this.columns = [];
    this.createColumns();
    this.render();
  }

  createColumns() {
    for (let i = 1; i <= 7; i++) {
      this.columns.push(new Column(i, this));
    }
  }

  addBrickInSlot(column) {
    let playerTurn = this.checkWhosTurn();
    if (this.checkIfColumnIsFull(column)) {
      column.bricksInsideMe++;
      let slot = column.slots[column.slotIndex];
      slot.brickInside.push(new Brick(playerTurn.color));
      this.render();
      if (this.winChecker(playerTurn.color) === true) {
        return;
      }
      this.changePlayer();
      column.slotIndex--;
      playerTurn = this.checkWhosTurn();
      this.makeRandomMove(playerTurn);
      this.checkForDraw();
      this.render();
      if (this.winChecker(playerTurn.color) === true) {
        return;
      }
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
          this.newGame();
          return true;
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

        if(this.columns[j].slots[i].brickInside[0] === undefined){
          winCounter = 0;
        }

        if (winCounter === 4) {
          alert(color + " wins");
          this.newGame();
          return true;
        }
      }
    }

    let f = 3;
    let j = 0;
    for (let i = 0; i < 4; i++) { 
      if (this.columns[j].slots[f].brickInside[0] !== undefined) {
        if (this.columns[j].slots[f].brickInside[0].color === color) {

          winCounter++;
          console.log("hej");
        }
      }
      
      if (this.columns[j].slots[f].brickInside[0] !== undefined) {
        if (this.columns[j].slots[f].brickInside[0].color !== color) {

          winCounter = 0;
        }
      }

      if (winCounter === 4) {
        alert(color + " wins");
        this.newGame();
        return true;
      }
      f--;
      j++;
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

  checkForDraw() {
    let drawCounter = 0;

    for (let i = 0; i <= 5; i++) {
      for (let j = 0; j <= 6; j++) {
        if (this.columns[j].slots[i].brickInside[0] !== undefined ) {
          drawCounter++;
        }
      }
      if (drawCounter === 42) {
        alert('draw')
        this.newGame();
        return true;
      }
    }
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