class Column extends Component {

  constructor(columnId, game) {
    super();
    this.addEvents({
      'click .hidden-div-for-click': 'clickOnMe'
    });
    this.columnId = columnId;
    this.game = game;
    this.slots = [];
    this.createSlots();
    this.bricksInsideMe = 0;
    this.slotIndex = 5;
  }
  /* get isFull() {
    return this.bricksInsideMe >= 6;

  } */

  createSlots() {
    for (let i = 6; i >=1; i--) {
      this.slots.push(new Slot(this.columnId, i));
    }
  }

  clickOnMe() {
    this.game.humanMakeMove(this);
  }

  emptyColumn() {
    this.slots = [];
    this.createSlots();
    this.bricksInsideMe = 0;
    this.slotIndex = 5;
  }

}