class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    // Add form component here, the same way we add the game below
    this.form = [
      new Form()
    ];
    this.game = [
      new Game()
    ];
    
  }

}