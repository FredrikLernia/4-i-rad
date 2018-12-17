class MiddlePage extends Component{

  constructor(result, name, moves, time){
    super();

    // Those properties are just temporary for working with the layout
    // The values shall later be equal to the result of the game
    this.result = result;
    this.name = name;
    this.moves = moves;
    this.time = time;
    this.isHighscore = true;
  }
}