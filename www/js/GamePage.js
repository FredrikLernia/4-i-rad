class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.players = [];
    this.middlePage = [];
    this.createForm();
  }

  createForm() {
    this.form = new Form(this);
  }

  createGame() {
    this.game = new Game(this.players, this);
    this.render();
    this.baseEl.find('.form').hide();
    this.baseEl.find('.game').show();
  }

}