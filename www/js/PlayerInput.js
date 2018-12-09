class PlayerInput extends Component {

  constructor(playerNr, formPage) {
    super();
    this.addEvents({
      'click .color-name': 'chooseColor',
      'click .player-type': 'choosePlayerType'
    })
    this.playerNr = playerNr;
    this.formPage = formPage;
  }

  chooseColor(e) {
    e.preventDefault();
    this.baseEl.find('.choose-color').html(e.target.innerHTML);
  }

}