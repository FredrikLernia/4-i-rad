class Bot extends Player{

  constructor(name, color){

    super(name, color);
  }

  makeRandomizedMove(){

    let rand = Math.floor((Math.random() * 7));
    return rand--;
  }

  makeCalculatedMove(){

    
  }
}