class Game extends Component {

  constructor(players) {
    super();
    this.addEvents({
      'click .restart': 'startNewGame'
    });
    this.players = players;
    this.delta = 0;
    this.totalTime = 0;
    this.start = Date.now();
    this.startNewGame();
  }

  startNewGame() {
    this.isWaiting = false;
    this.turn = 0;
    this.columns = [];
    this.createColumns();
    this.players[0].resetMovesCounter();
    this.players[1].resetMovesCounter();
    this.render();
    //this.startTimer();
  }
  
  createColumns() {
    for (let i = 1; i <= 7; i++) {
      this.columns.push(new Column(i, this));
    }
  }

  addBrickInSlot(column) {
    let playerTurn = this.checkWhosTurn();

    if(this.players[1] instanceof Bot && this.isWaiting === true){
    return;
    }
    else{
    this.playerMove(playerTurn, column);

    this.changePlayer();
    this.moveTimer();
    column.slotIndex--;
    this.isWaiting = true;
    }

    playerTurn = this.checkWhosTurn();
    setTimeout(() => {
      this.botMove(playerTurn);
      this.isWaiting = false;
    }, 1000);
  }

  playerMove(playerTurn, column) {

    if (!this.checkIfColumnIsFull(column)) {
      column.bricksInsideMe++;
      let slot = column.slots[column.slotIndex];
      slot.brickInside.push(new Brick(playerTurn.color));
      playerTurn.moveCounter();
      this.render();
      if (this.newWinChecker(playerTurn.color)) {
        this.players[0].resetMovesCounter();
        this.players[1].resetMovesCounter();
        this.render();
        return;
      }
    }
  }

  botMove(playerTurn) {

    this.makeRandomMove(playerTurn);
    if (this.newWinChecker(playerTurn.color)) {
      return;
    }
    this.checkForDraw();
    this.render();
    if (this.newWinChecker(playerTurn.color)) {
      this.players[0].resetMovesCounter();
      this.players[1].resetMovesCounter();
      this.render();
      return;
    }
  }

  moveTimer() {

    this.delta = (Date.now() - this.start) / 1000;
    this.totalTime += Math.round(this.delta * 1000) / 1000;
    console.log("time for this move: " + this.delta);
    console.log("total time passed: " + this.totalTime);
    this.start = Date.now();
  }

  startTimer() {
    let start = Date.now();
    setInterval(function () {
      this.delta = Date.now() - start; // milliseconds elapsed since start
      this.delta = Math.floor(this.delta / 1000); // in seconds
      // alternatively just show wall clock time:
    }, 1000);
  }

  delay(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) { }
  }

  async test() {

    await sleep(1000);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  newWinChecker(playerColor) {

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
          alert(playerColor + " wins");
          this.startNewGame();
          return true;
        }
      }
    }
  }

  makeRandomMove(playerTurn) {
    let randCol;
    let validMoveChecker = false;
    while (validMoveChecker === false) {
      randCol = this.players[1].makeRandomizedMove();
      if (!this.botCheckIfColumnIsFull(this.columns[randCol])) {
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

    for (let row = 0; row <= 5; row++) {
      for (let col = 0; col <= 6; col++) {
        if (this.columns[col].slots[row].brickInside[0] !== undefined ) {
          drawCounter++;
        }
      }
      if (drawCounter === 42) {
        alert('draw')
        this.startNewGame();
        this.players[0].resetMovesCounter();
        this.players[1].resetMovesCounter();
        return true;
      }
    }
  }

  checkIfColumnIsFull(column) {
    if (column.bricksInsideMe < 6) { return false; }
    alert('This column is full')
  }

  botCheckIfColumnIsFull(column) {
    if (column.bricksInsideMe < 6) { return false; }
    return true;
  }

  checkWhosTurn() {

    return this.players[this.turn];
  }

  changePlayer() {
    if (this.turn === 0) { this.turn++; }
    else { this.turn--; }
    this.render();
  }

}