class Bot extends Player{

  constructor(color){
    super(color);
    this.namesArray = ['Klas', 'Hans', 'Olof', 'David', 'Per', 'Herman'];
    this.name = this.getRandomName();
  }

  getRandomNumber() {
    let rand = Math.floor(Math.random() * 7);
    return rand;
  }

  getRandomName(){
    let rand = Math.round(Math.random() * (this.namesArray.length-1));
    return this.namesArray[rand];
  }
}