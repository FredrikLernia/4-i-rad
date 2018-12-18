class HighscorePage extends Component {

  constructor(){
    super();
    this.addRoute('/topplista', 'Topplista');
    this.highscoreItems = [];
    this.getHighscore();
  }

  getHighscore() {
    JSON._load('highscore.json').then((highscore) => {
      let highscoreList = highscore['highscore-list'];
      for (let item of highscoreList) {
        this.highscoreItems.push(new HighscoreItem(item));
      }
      this.render();
    });
  }

}