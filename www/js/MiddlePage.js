class MiddlePage extends Component{

  constructor(result, name, moves, time, playerOneIsHuman, playerTwoIsHuman, playerType){
    super();
    this.result = result;
    this.name = name;
    this.moves = moves;
    this.time = time;
    this.playerOneIsHuman = playerOneIsHuman;
    this.playerTwoIsHuman = playerTwoIsHuman;
    this.playerType = playerType;
    this.loadHighscore();

    this.getGameMode();
    this.writeResult();
  }

  loadHighscore() {
    JSON._load('highscore.json').then((highscore) => {
      let jsonHighscoreList = highscore['highscore-list'];
      let highscoreList = [];
      for (let item of jsonHighscoreList) {
        highscoreList.push(item);
      }
      if (this.checkIfHighscore(highscoreList)) {
        this.isHighscore = true;
      }
      else {
        this.isHighscore = false;
      }
    });
  }

  checkIfHighscore(highscoreList) {
    let gameResult = {
      name: this.name,
      moves: this.moves,
      time: this.time
    };
    
    for (let [index, item] of highscoreList.entries()) {
      if (gameResult.moves <= item.moves) {
        if (gameResult.moves === item.moves && gameResult.time <= item.time) {
          this.putIntoHighscore(highscoreList, index, gameResult);
          break;
        }
        else if (gameResult.moves < item.moves) {
          this.putIntoHighscore(highscoreList, index, gameResult);
          break;
        }
      }
    }

    return true;
  }

  putIntoHighscore(highscoreList, index, gameResult) {
    highscoreList.splice(index, 0, gameResult);
    highscoreList.length = 10;
    JSON._save('highscore.json', {'highscore-list': highscoreList});
    Store.highscore.loadHighscore();
  }

  getGameMode() {
    if (this.playerOneIsHuman && this.playerTwoIsHuman) {
      this.gameMode = 'human/human';
    }
    else if ((this.playerOneIsHuman && !this.playerTwoIsHuman) || (!this.playerOneIsHuman && this.playerTwoIsHuman)) {
      this.gameMode = 'human/bot';
    }
    else {
      this.gameMode = 'bot/bot';
    }
  }

  writeResult() {
    if (this.result === 'won/lost' && this.playerType === 'human') {
      this.renderMode = 'human won';
    }
    else if (this.result === 'won/lost' && this.playerType === 'bot' && this.gameMode === 'human/bot') {
      this.renderMode = 'human lost';
    }
    else if (this.result === 'won/lost' && this.gameMode === 'bot/bot') {
      this.renderMode = 'bot won';
    }
    else {
      this.renderMode = 'draw';
    }
  }
}