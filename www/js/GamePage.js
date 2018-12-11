class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.form = [
      new Form()
    ];
    this.game = [
      new Game()
    ];
  }

}