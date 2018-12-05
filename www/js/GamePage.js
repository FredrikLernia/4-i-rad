class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({'click .restart':'restartGame'
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
  restartGame(){

  }

  addBrickInSlot(column) {
    let playerTurn = this.checkWhosTurn();
    if (this.checkIfColumnIsFull(column)) {
      column.bricksInsideMe++;
      let slot = column.slots[column.slotIndex];
      slot.brickInside.push(new Brick(playerTurn.color));
      this.changePlayer();
      this.render();
      column.slotIndex--;
      playerTurn = this.checkWhosTurn();
      this.makeRandomMove(playerTurn);
    }
  }

  makeRandomMove(playerTurn){
  let randCol;
  let validMoveChecker = false; 
  while(validMoveChecker === false){
  randCol = this.players[1].makeRandomizedMove();
  if(this.botCheckIfColumnIsFull(this.columns[randCol]) === true)
  validMoveChecker = true;
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
    else{
    alert('This column is full');
    return false;
    }
  }

  botCheckIfColumnIsFull(column) {
    if (column.bricksInsideMe < 6) { return true; }
    else{
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