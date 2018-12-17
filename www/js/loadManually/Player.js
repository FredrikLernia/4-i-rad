class Player {

  constructor(color){
    this.color = color;
    this.movesMade = 0;
    this.isYourTurn = false;
    this.timeOfMoves = 0;
  }

  moveCounter(){
    this.movesMade++;
    return this.movesMade;
  }

  resetMovesCounter(){
    this.movesMade = 0;
  }
}