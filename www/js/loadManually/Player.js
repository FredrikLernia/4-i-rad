class Player {

  constructor(color){
    this.color = color;
    this.movesMade = 0;
    this.isYourTurn = false;
  }

  moveCounter(){
    this.movesMade++;
  }

  resetMovesCounter(){
    this.movesMade = 0;
  }
}