class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Game', '/game')
      new NavItem('Spelregler', '/'),
      new NavItem('HighScore', '/'),
    ];
  }

}