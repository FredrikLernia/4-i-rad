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

    this.createPlayer(this.playerOne);
    this.createPlayer(this.playerTwo);

    this.gamePage.createGame();
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