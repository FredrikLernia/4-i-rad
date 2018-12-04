class Player {

  constructor(name, color){

    this.name = name;
    this.color = color;
    this.movesMade = 0;
    this.isYourTurn = false;
  }

  isItYourTurn(isYourTurn){


  }

  moveCounter(movesMade){

    movesMade++;
    return movesMade;
  }
}