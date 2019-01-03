class Form extends Component {

  constructor(gamePage) {
    super();
    this.addEvents({
      'click .start-game': 'storeNames'
    });
    this.gamePage = gamePage;
    this.playerInputs = [
      new PlayerInput(1, this),
      new PlayerInput(2, this)
    ];
    this.playerOne = {};
    this.playerTwo = {};
  } 

  storeNames() {
    // Saving the name inputs to the player objects
    this.playerOne.name = this.baseEl.find('#player-1').find('.player-name').val();
    this.playerTwo.name = this.baseEl.find('#player-2').find('.player-name').val();
    
    if(this.validatePlayerNames() && this.validatePlayerType() && this.validatePlayerColor()){
    
      this.createPlayer(this.playerOne);
      this.createPlayer(this.playerTwo);
    
      this.gamePage.createGame();
    }
  }
  
  validatePlayerNames(){
    let bot1 = this.baseEl.find('#player-1').find('.choose-player-type')[0].innerText;
    let bot2 = this.baseEl.find('#player-2').find('.choose-player-type')[0].innerText;
    if (bot1 === '💻 Dator '){
      this.playerOne.name = 'bot1';
    }
    if (bot2 === '💻 Dator '){
      this.playerTwo.name = 'bot2';
    }
    if (this.playerOne.name.length < 2 || this.playerOne.name.length > 10){
      this.baseEl.find('#player-1-text').show();
    }
    else {
      this.baseEl.find('#player-1-text').hide();
    }
    if (this.playerTwo.name.length < 2 || this.playerTwo.name.length > 10){
      this.baseEl.find('#player-2-text').show();
    }
    else {
      this.baseEl.find('#player-2-text').hide();
    }
    if((this.playerOne.name.length > 1 && this.playerOne.name.length < 11) && (this.playerTwo.name.length > 1 && this.playerTwo.name.length < 11)){
      return true;
    }
    return false;
  }

  validatePlayerType(){
    let currentPlayerType;
    for (let i = 1; i <= 2; i++) {
      currentPlayerType = this.baseEl.find('#player-' + i).find('.choose-player-type')[0].innerText;
      if (currentPlayerType === '👨‍💻 Spelartyp ') {
        this.baseEl.find('#player-' + i).find('#player-type').show();
      } 
    }  
    if (this.baseEl.find('#player-1').find('.choose-player-type')[0].innerText != '👨‍💻 Spelartyp ' && this.baseEl.find('#player-2').find('.choose-player-type')[0].innerText != '👨‍💻 Spelartyp ') {
      return true;
    } 
    return false;  
  }

  validatePlayerColor(){
    let currentPlayerColor;
    for(let i = 1; i <= 2; i++) {
      currentPlayerColor = this.baseEl.find('#player-' + i).find('.choose-color')[0].innerText;
      if (currentPlayerColor === '🎨 Färg '){
        this.baseEl.find('#player-' + i).find('#player-color').show();
      }
    }
    if (this.baseEl.find('#player-1').find('.choose-color')[0].innerText != '🎨 Färg ' && this.baseEl.find('#player-2').find('.choose-color')[0].innerText!= '🎨 Färg '){
      return true;
    }
    return false;
  }

  /* createPlayer(player) {
    if (player.type === '💻 Dator') {
      this.gamePage.game[0].players.push(new Bot(player.color));
    }
    else {
      this.gamePage.game[0].players.push(new HumanPlayer(player.name, player.color))
    }
  } */

  createPlayer(player) {
    if (player.type === '💻 Dator') {
      this.gamePage.players.push(new Bot(player.color));
    }
    else {
      this.gamePage.players.push(new HumanPlayer(player.name, player.color))
    }
  }

  

}