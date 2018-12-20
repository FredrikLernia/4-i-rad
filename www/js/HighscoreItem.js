class HighscoreItem extends Component {

  constructor(index, highscore) {
    super();
    this.rank = index + 1;
    this.name = highscore.name;
    this.moves = highscore.moves;
    this.time = highscore.time;
  }

}