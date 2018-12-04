class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Spela', '/spela'),
      new NavItem('Spelregler', '/'),
      new NavItem('HighScore', '/'),
    ];
  }

}