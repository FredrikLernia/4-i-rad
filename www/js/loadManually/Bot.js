class Bot extends Player{

  constructor(color){

    super(color);
  }

  makeRandomizedMove(){

    let rand = Math.floor((Math.random() * 7));
    return rand--;
  }

  makeCalculatedMove(){

    
  }
}