class HumanPlayer extends Player{

  constructor(name, color){

    super(color);
    this.name = name;
  }

  makeMove(col,gamePage1){

    console.log(col);
    console.log(gamePage1);
    gamePage1.addBrickInSlot(col);
  }
}