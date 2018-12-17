class Game extends Component {

  constructor(players, gamePage) {
    super();
    this.addEvents({
      'click .restart': 'restartGame'
    });
    this.players = players;
    this.gamePage = gamePage;
    this.columns = [];
    this.start = Date.now();
    this.createColumns();
    this.startNewGame();
  }

  createColumns() {
    for (let i = 1; i <= 7; i++) {
      this.columns.push(new Column(i, this));
    }
  }

  startNewGame() {
    this.turnIndex = 0;
    this.playerTurn = this.checkWhosTurn();
    this.gameOver = false;
    this.movesThisGame = 0;
    this.start;
    this.playerIsWaiting = false;
    this.render();
    if (this.playerTurn instanceof Bot) {
      this.playerIsWaiting = true;
      this.botMakeMove();
    }
  }

  checkWhosTurn() {
    return this.players[this.turnIndex];
  }

  botMakeMove() {
    if (!this.gameOver) {
      setTimeout(() => {
        let randomNumber = this.playerTurn.getRandomNumber();
        while (!this.addBrickInSlot(this.columns[randomNumber])) {
          randomNumber = this.playerTurn.getRandomNumber();
        }
        if (!this.gameOver) {
          this.changePlayer();
        }
      }, 1000)
    }
  }

  humanMakeMove(clickedColumn) {
    if (!this.gameOver && !this.playerIsWaiting && this.addBrickInSlot(clickedColumn)) {
      if (!this.gameOver) {
        this.changePlayer();
      }
    }
  }

  addBrickInSlot(column) {
    if (this.checkIfColumnIsFull(column)) {
      return false;
    }

    column.bricksInsideMe++;
    this.movesThisGame++;

    let slot = column.slots[column.slotIndex];
    slot.brickInside.push(new Brick(this.playerTurn.color));
    column.slotIndex--;
    this.playerTurn.moveCounter();
    if (this.playerTurn instanceof HumanPlayer) {
      this.moveTimer();
    }
    slot.render();

    if (this.winChecker(this.playerTurn.color)) {
      this.gameOver = true;
      setTimeout(() => {
        this.redirectToMiddlePage('won/lost');
      }, 1500)
    }

    if (this.checkForDraw()) {
      this.gameOver = true;
      setTimeout(() => {
        this.redirectToMiddlePage('draw');
      }, 1500)
    }

    return true;
  }

  checkIfColumnIsFull(column) {
    return column.bricksInsideMe >= 6;
  }

  winChecker(playerColor) {

    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        let hor = true, ver = true, dia1 = true, dia2 = true;
        let horCheck = false, verCheck = false, dia1Check = false, dia2Check = false;

        for (let i = 0; i < 4; i++) {

          horCheck = this.columns[col + i];
          hor = hor && horCheck && this.columns[col + i].slots[row].brickInside[0] !== undefined && this.columns[col + i].slots[row].brickInside[0].color === playerColor;

          verCheck = this.columns[col].slots[row + i];
          ver = ver && verCheck && this.columns[col].slots[row + i].brickInside[0] !== undefined && this.columns[col].slots[row + i].brickInside[0].color === playerColor;

          dia1Check = this.columns[col + i];
          dia1 = dia1 && dia1Check && this.columns[col + i].slots[row + i] !== undefined && this.columns[col + i].slots[row + i].brickInside[0] !== undefined && this.columns[col + i].slots[row + i].brickInside[0].color === playerColor;

          dia2Check = this.columns[col + i];
          dia2 = dia2 && dia2Check && this.columns[col + i].slots[row - i] !== undefined && this.columns[col + i].slots[row - i].brickInside[0] !== undefined && this.columns[col + i].slots[row - i].brickInside[0].color === playerColor;

        }

        if (hor || ver || dia1 || dia2) {
          return true;
        }
      }
    }
  }

  checkForDraw() {
    return this.movesThisGame === 42;
  }

  changePlayer() {
    if (this.turnIndex === 0) { this.turnIndex++; }
    else { this.turnIndex--; }

    this.playerTurn = this.checkWhosTurn();
    if (this.playerTurn instanceof Bot) {
      this.playerIsWaiting = true;
      this.botMakeMove();
    }
    else {
      this.playerIsWaiting = false;
    }
    this.start = Date.now();
    this.render();
  }

  restartGame() {
    for (let column of this.columns) {
      column.emptyColumn();
    }

    for (let player of this.players) {
      player.resetMovesCounter();
    }

    this.startNewGame();
  }

  moveTimer() {

    this.delta = (Date.now() - this.start) / 1000;
    this.players[this.turnIndex].timeOfMoves += Math.round(this.delta * 1000) / 1000;
    console.log("time for this move: " + this.delta);
    console.log("total time passed: " + this.players[this.turnIndex].timeOfMoves);
    this.start = Date.now();
  }

  redirectToMiddlePage(gameResult) {
    let result = gameResult;
    let name;
    let moves;
    let time;

    if (result === 'won/lost') {
      if (this.playerTurn instanceof HumanPlayer) {
        result = 'won';
        name = this.playerTurn.name;
        moves = this.playerTurn.movesMade;
        time = this.playerTurn.timeOfMoves;
      } else {
        result = 'lost'
      }
    }
    else {
      result = 'draw'
    }

    //result, name, moves, time
    this.gamePage.middlePage.push(new MiddlePage(result, name, moves, time));
    this.gamePage.render();

    this.gamePage.baseEl.find('.form').hide();
    this.gamePage.baseEl.find('.game').hide();
    this.gamePage.baseEl.find('.middle-page').show();
  }

}