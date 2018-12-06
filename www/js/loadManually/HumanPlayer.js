class HumanPlayer extends Player{

  constructor(name, color){

    super(name, color);
  }

  makeMove(col,gamePage1){

    console.log(col);
    console.log(gamePage1);
    gamePage1.addBrickInSlot(col);
  }
}