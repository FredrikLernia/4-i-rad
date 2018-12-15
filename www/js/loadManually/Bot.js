class Bot extends Player{

  constructor(color){
    super(color);
    this.name = 'Bot';
  }

  makeRandomizedMove(){

    let rand = Math.floor((Math.random() * 7));
    return rand--;
  }

  makeCalculatedMove(){

    
  }
}