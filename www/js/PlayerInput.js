class PlayerInput extends Component {

  constructor(playerNr, form) {
    super();
    this.addEvents({
      'click .player-type': 'choosePlayerType',
      'click .color-name': 'chooseColor'
    });
    this.playerNr = playerNr;
    this.form = form;
    this.playerType = ['👨‍💻 Spelartyp'];
    this.chosenColor = ['🎨 Färg'];
    Store.chosenColors = [];
  }

  choosePlayerType(e) {
    e.preventDefault();
    this.playerType = [e.target.innerHTML];
    this.render();
  }

  chooseColor(e) {
    e.preventDefault();

    // Get the swedish colorname
    let listColorName = e.target.text;

    // Get the color class
    let listColorClass = e.target.className.split(' ')[2];

    // Get the color HTML
    let listColorHTML = e.target.innerHTML;

    // Create a new object with the two values from above
    let colorObj = {
      colorName: listColorName,
      colorClass: listColorClass
    };

    // Extract the color name from the html inside the color button
    // in a pretty confusing way
    let lastIndexOfChar = this.chosenColor[0].lastIndexOf('>');
    let HTMLtags = this.chosenColor[0].substr(0, lastIndexOfChar + 1);
    let currentColorHTML = this.chosenColor[0];
    let extractedColorName = currentColorHTML.replace(HTMLtags, '');

    // Remove previously chosen color from Store and add the new color
    if (this.chosenColor[0] !== '🎨 Färg') {
      let index = Store.chosenColors.map(function(e) {
        return e.colorName;
      }).indexOf(extractedColorName);
      Store.chosenColors.splice(index, 1);
    }

    Store.chosenColors.push(colorObj);

    // Change the button to the selected color
    this.chosenColor = [listColorHTML];
    this.render();

    this.form.render();

    // Hide all classes that are in Store
    for (let colorToHide of Store.chosenColors) {
      let nameOfClass = '.' + colorToHide.colorClass;
      this.form.baseEl.find(nameOfClass).hide();
    }
  }

}