class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/game', 'Game');
    this.columns = [
      new Column(1),
      new Column(2),
      new Column(3),
      new Column(4),
      new Column(5),
      new Column(6),
      new Column(7),
    ];
  }
  
}