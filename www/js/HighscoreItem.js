class HighscoreItem extends Component {

  constructor(highscore) {
    super();
    this.rank = highscore.rank;
    this.name = highscore.name;
    this.moves = highscore.moves;
    this.time = highscore.time;
  }

}