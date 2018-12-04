class Column extends Component {

  constructor(columnId) {
    super();
    this.columnId = columnId;
    this.slots = [
      new Slot(this.columnId, 6),
      new Slot(this.columnId, 5),
      new Slot(this.columnId, 4),
      new Slot(this.columnId, 3),
      new Slot(this.columnId, 2),
      new Slot(this.columnId, 1),
    ];
  }

}