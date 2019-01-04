class MiddlePage extends Component {

  constructor(game, result, name, moves, time, playerOneIsHuman, playerTwoIsHuman, playerType, winningBoard) {
    super();
    this.addEvents({
      'click .play-again': 'playAgain',
      'click .to-highscore': 'highlightHighscore'
    });
    this.game = game;
    this.result = result;
    this.name = name;
    this.moves = moves;
    this.time = time;
    this.playerOneIsHuman = playerOneIsHuman;
    this.playerTwoIsHuman = playerTwoIsHuman;
    this.playerType = playerType;
    this.winningBoard = winningBoard;

    this.getGameMode();
    this.writeResult();
    this.loadHighscore();
  }

  loadHighscore() {
    if (this.renderMode === 'human won') {
      JSON._load('highscore.json').then((highscore) => {
        let jsonHighscoreList = highscore['highscore-list'];
        let highscoreList = [];
        for (let item of jsonHighscoreList) {
          highscoreList.push(item);
        }
        if (this.checkIfHighscore(highscoreList)) {
          this.isHighscore = true;
          this.render();
        }
        else {
          this.isHighscore = false;
          this.render();
        }
      });
    }
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
          return true;
        }
        else if (gameResult.moves < item.moves) {
          this.putIntoHighscore(highscoreList, index, gameResult);
          return true;
        }
      }
    }

    return false;
  }

  putIntoHighscore(highscoreList, index, gameResult) {
    highscoreList.splice(index, 0, gameResult);
    highscoreList.length = 10;
    JSON._save('highscore.json', { 'highscore-list': highscoreList });
    Store.highscore.loadHighscore();
    this.highscoreRank = index + 1;
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
    this.winningBoardHTML = this.winningBoard[0].innerHTML;

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

  playAgain() {
    this.game.resetGame();
    this.baseEl.hide();
    this.game.gamePage.baseEl.find('.game').show();
  }

  highlightHighscore() {
    this.game.gamePage.game = [];
    this.game.gamePage.pageContent.baseEl.find(`.rank-${this.highscoreRank}`).addClass('highlight-color');
  }
}