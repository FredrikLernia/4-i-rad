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
    console.log("arraylist ", this.namesArray.length-1)
    let rand = Math.round(Math.random() * (this.namesArray.length-1));
    console.log(rand);
    return this.namesArray[rand];
  }
}