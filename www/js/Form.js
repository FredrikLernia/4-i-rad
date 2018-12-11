class Form extends Component {

  constructor() {
    super();
    this.playerInputs = [
      new PlayerInput(1, this),
      new PlayerInput(2, this)
    ];
    this.colorTranslation = {
      'Gul': 'yellow',
      'Röd': 'red',
      'Grön': 'green',
      'Lila': 'purple'
    };
  }

}