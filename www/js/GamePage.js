class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    this.addEvents({'click .restart':'restartGame'
  });
    this.columns = [
      new Column(1, this),
      new Column(2, this),
      new Column(3, this),
      new Column(4, this),
      new Column(5, this),
      new Column(6, this),
      new Column(7, this),
    ];
  }
  restartGame(){

  }

  addBrickInColumn(column) {
    if (this.checkWhereToPlaceBrick(column)) {
      column.bricksInsideMe++;
      let id = '#' + column.columnId + '-' + column.bricksInsideMe;
      this.baseEl.find(id).css({'background-color': 'yellow'});
    }
  }

  checkWhereToPlaceBrick(column) {
    if (column.bricksInsideMe < 6) { return true; }
    return alert('This column is full');
  }

}