class Column extends Component {

  constructor(columnId, gamePage) {
    super();
    this.addEvents({
      'click .hidden-div-for-click': 'clickOnMe'
    });
    this.columnId = columnId;
    this.gamePage = gamePage;
    this.slots = [];
    this.createSlots();
    this.bricksInsideMe = 0;
    this.slotIndex = 5;
  }

  createSlots() {
    for (let i = 6; i >=1; i--) {
      this.slots.push(new Slot(this.columnId, i));
    }
  }

  clickOnMe() {
    this.gamePage.addBrickInSlot(this);
  }

}