class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.form = [
      new Form(this)
    ];
    this.game = [
      new Game()
    ];
  }

}