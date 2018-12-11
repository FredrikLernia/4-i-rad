class Player {

  constructor(name, color){

    this.name = name;
    this.color = color;
    this.movesMade = 0;
    this.isYourTurn = false;
  }

  isItYourTurn(isYourTurn){


  }

  moveCounter(){
    this.movesMade++;
    return this.movesMade;
  }

  resetMovesCounter(){
    this.movesMade = 0;
  }
}