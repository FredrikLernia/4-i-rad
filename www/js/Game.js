class Game extends Component {

  constructor(players, gamePage) {
    super();
    this.addEvents({
      'click .restart': 'resetGame',
      'click .cancel': 'cancelGame'

    });
    this.players = players;
    this.gamePage = gamePage;
    this.columns = [];
    this.start = Date.now();
    this.resetGame();
  }

  /* clearPlayers() {
    if (this.players.length >= 4) {
      this.players.shift();
      this.players.shift();
    }
  } */

  createColumns() {
    for (let i = 1; i <= 7; i++) {
      this.columns.push(new Column(i, this));
    }
  }

  resetGame() {
    this.gamePage.middlePage = [];
    this.columns = [];
    this.createColumns();
    for (let player of this.players) {
      player.movesMade = 0;
      if (player instanceof HumanPlayer) {
        player.timeOfMoves = 0;
      }
    }
    this.startNewGame();
  }

  cancelGame() {
    this.clearCurrentPlayers();
    this.gamePage.form = [];
    this.gamePage.game = [];
    this.gamePage.baseEl.find('.game').hide();
    this.gamePage.createForm();
    this.gamePage.render();
  }

  startNewGame() {
    this.turnIndex = 0;
    this.playerTurn = this.checkWhosTurn();
    this.gameOver = false;
    this.movesThisGame = 0;
    this.start = Date.now();
    this.playerIsWaiting = false;
    this.render();
    if (this.playerTurn instanceof Bot) {
      this.playerIsWaiting = true;
      this.botMakeMove();
    }
    if (this.players[0] instanceof Bot && this.players[1] instanceof Bot) {
      while (this.players[0].name === this.players[1].name) {
        this.players[1].name = this.players[1].getRandomName();
        console.log("rerolling");
      }
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
    console.log('column.bricksInsideMe', column.bricksInsideMe)
    this.movesThisGame++;
    if (this.checkIfColumnIsFull(column)) {
      return false;
    }

    
    

    let slot = column.slots[column.slotIndex];
    slot.brickInside.push(new Brick(this.playerTurn.color));
    column.slotIndex--;
    this.playerTurn.moveCounter();
    column.bricksInsideMe++;
    slot.render();
    if (this.playerTurn instanceof HumanPlayer) {
      this.moveTimer();
    }
    

    if (this.winChecker(this.playerTurn.color)) {
      this.gameOver = true;
      //baseEl startar från yttersta template div och letar sig
      //fram till klassen .game-clone som klonas med hjälp av 
      //jQuery och sparas i en variabel gameBoard
      //som senare skickas med till middle page.
      this.gameBoard = this.baseEl.find('.game-clone').clone();
      setTimeout(() => {
        this.redirectToMiddlePage('won/lost');
      }, 2500)
    }

    if (this.checkForDraw()) {
      this.gameOver = true;
      this.gameBoard = this.baseEl.find('.game-clone').clone();
      setTimeout(() => {
        this.redirectToMiddlePage('draw');
      }, 2000)
    }

    return true;
  }

  checkIfColumnIsFull(column) {
    console.log('column.isFull', column.isFull);
    if (column.isFull) {
    column.render();
    }
    return column.isFull;
  }

  winChecker(playerColor) {

    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        let hor = true, ver = true, dia1 = true, dia2 = true;
        let horCheck = false, verCheck = false, dia1Check = false, dia2Check = false;
        let vertArr = [];
        let horArr = [];
        let dia1Arr = [];
        let dia2Arr = [];
        for (let i = 0; i < 4; i++) {

          horCheck = this.columns[col + i];
          hor = hor && horCheck && this.columns[col + i].slots[row].brickInside[0] !== undefined && this.columns[col + i].slots[row].brickInside[0].color === playerColor;
          hor && (horArr.push(this.columns[col + i].slots[row]));

          verCheck = this.columns[col].slots[row + i];
          ver = ver && verCheck && this.columns[col].slots[row + i].brickInside[0] !== undefined && this.columns[col].slots[row + i].brickInside[0].color === playerColor;
          ver && (vertArr.push(this.columns[col].slots[row + i]));

          dia1Check = this.columns[col + i];
          dia1 = dia1 && dia1Check && this.columns[col + i].slots[row + i] !== undefined && this.columns[col + i].slots[row + i].brickInside[0] !== undefined && this.columns[col + i].slots[row + i].brickInside[0].color === playerColor;
          dia1 && (dia1Arr.push(this.columns[col + i].slots[row + i]));

          dia2Check = this.columns[col + i];
          dia2 = dia2 && dia2Check && this.columns[col + i].slots[row - i] !== undefined && this.columns[col + i].slots[row - i].brickInside[0] !== undefined && this.columns[col + i].slots[row - i].brickInside[0].color === playerColor;
          dia2 && (dia2Arr.push(this.columns[col + i].slots[row - i]));
        }

        if (hor || ver || dia1 || dia2) {
          if (vertArr.length === 4) {
            this.winSlots = vertArr;
          }
          else if (horArr.length === 4) {
            this.winSlots = horArr;
          }
          else if (dia1Arr.length === 4) {
            this.winSlots = dia1Arr;
          }
          else if (dia2Arr.length === 4) {
            this.winSlots = dia2Arr;
          }
          for (let slot of this.winSlots) {
            slot.win = true;
            slot.render();
          }
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

  moveTimer() {

    this.delta = (Date.now() - this.start) / 1000;
    this.players[this.turnIndex].timeOfMoves += Math.round(this.delta * 1000) / 1000;
    this.players[this.turnIndex].timeOfMoves = this.players[this.turnIndex].timeOfMoves.toFixed(2);
    this.players[this.turnIndex].timeOfMoves = parseFloat(this.players[this.turnIndex].timeOfMoves);
    this.start = Date.now();
  }

  redirectToMiddlePage(gameResult) {
    let result = gameResult;
    let name = this.playerTurn.name;
    let moves = this.playerTurn.movesMade;
    let time = this.playerTurn.timeOfMoves;
    let playerOneIsHuman = this.players[0] instanceof HumanPlayer;
    let playerTwoIsHuman = this.players[1] instanceof HumanPlayer;

    let playerType;
    if (this.playerTurn instanceof HumanPlayer) {
      playerType = 'human';
    }
    else {
      playerType = 'bot';
    }

    this.clearCurrentPlayers();

    this.gamePage.middlePage.push(new MiddlePage(this, result, name, moves, time, playerOneIsHuman, playerTwoIsHuman, playerType, this.gameBoard));
    this.gamePage.render();

    this.gamePage.baseEl.find('.form').hide();
    this.gamePage.baseEl.find('.middle-page').show();
  }

  clearCurrentPlayers() {
    this.gamePage.players = [];
    Store.chosenColors = [];
    for (let player of this.gamePage.form.playerInputs) {
      player.playerName = '';
      player.playerType = ['👨‍💻 Spelartyp'];
      player.chosenColor = ['🎨 Färg'];
    }
  }

}
