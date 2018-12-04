class Bot extends Player{

  constructor(){

    super();
  }

  makeRandomizedMove(){

    let randomCol = Math.floor((Math.random() * 7) + 1);
    gameBoard.addBrick(randomCol);
  }

  makeCalculatedMove(){

    
  }
}