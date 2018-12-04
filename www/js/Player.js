class Player {

  constructor(name, color, movesMade, isYourTurn){

    this.name = name;
    this.color = color;
    this.movesMade = movesMade;
    this.isYourTurn = isYourTurn;
  }

  isItYourTurn(isYourTurn){


  }

  moveCounter(movesMade){

    movesMade++;
    return movesMade;
  }
}