class HighscorePage extends Component {

  constructor(){
    super();
    this.addRoute('/topplista', 'Topplista');
    this.loadHighscore();
    Store.highscore = this;
  }

  loadHighscore() {
    JSON._load('highscore.json').then((highscore) => {
      let jsonHighscoreList = highscore['highscore-list'];
      this.highscoreItems = [];
      for (let [index, item] of jsonHighscoreList.entries()) {
        this.highscoreItems.push(new HighscoreItem(index, item));
      }
      this.render();
    });
  }

}