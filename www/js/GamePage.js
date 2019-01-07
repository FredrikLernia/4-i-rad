class GamePage extends Component {

  constructor(pageContent) {
    super();
    this.addRoute('/spela', 'Spela');
    this.pageContent = pageContent;
    this.players = [];
    this.middlePage = [];
    this.createForm();
    //this.form = new Form(this);
  }

  createForm() {
    this.form = new Form(this);
  }

  createGame() {
    this.game = new Game(this.players, this);
    this.render();
    this.baseEl.find('.form').hide();
    this.baseEl.find('.game').show();
    //this.players = [];
  }

}