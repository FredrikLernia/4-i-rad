class Column extends Component {

  constructor(columnId, gamePage) {
    super();
    this.addEvents({
      'click .hidden-div-for-click': 'clickOnMe'
    });
    this.columnId = columnId;
    this.gamePage = gamePage;
    this.slots = [
      new Slot(this.columnId, 6),
      new Slot(this.columnId, 5),
      new Slot(this.columnId, 4),
      new Slot(this.columnId, 3),
      new Slot(this.columnId, 2),
      new Slot(this.columnId, 1),
    ];
    this.bricksInsideMe = 0;
  }

  clickOnMe() {
    this.gamePage.addBrickInColumn(this);
  }

}