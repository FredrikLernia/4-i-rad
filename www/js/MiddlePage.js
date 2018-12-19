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
    this.isHighscore = true;

    this.getGameMode();
    this.writeResult();
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