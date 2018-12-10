class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/spela', 'Spela');
    // Add form component here, the same way we add the game below
    this.form = [
      new Form()
    ];
    this.game = [
      new Game()
    ];
    
  }

  newWinChecker(playerColor){
    
    for(let col = 0; col < 7; col++){
      for(let row = 0; row < 6 ; row++){
          let hor = true, ver = true, dia1 = true, dia2 = true;
          let horCheck = false, verCheck = false, dia1Check = false, dia2Check = false;
          
          for(let i = 0; i < 4; i++){
            
            horCheck = this.columns[col+i];
            hor = hor && horCheck && this.columns[col+i].slots[row].brickInside[0] !== undefined && this.columns[col+i].slots[row].brickInside[0].color === playerColor;
            
            verCheck = this.columns[col].slots[row+i];
            ver = ver && verCheck && this.columns[col].slots[row+i].brickInside[0] !== undefined && this.columns[col].slots[row+i].brickInside[0].color === playerColor;
            
            dia1Check = this.columns[col+i];
            dia1 = dia1 && dia1Check && this.columns[col+i].slots[row+i] !== undefined && this.columns[col+i].slots[row+i].brickInside[0] !== undefined && this.columns[col+i].slots[row+i].brickInside[0].color === playerColor;

            dia2Check = this.columns[col+i];
            dia2 = dia2 && dia2Check && this.columns[col+i].slots[row-i] !== undefined && this.columns[col+i].slots[row-i].brickInside[0] !== undefined && this.columns[col+i].slots[row-i].brickInside[0].color === playerColor;
            
          }
          if(hor || ver || dia1 || dia2){
          alert(playerColor + " wins");
          this.newGame();
          return true;}
      }
    }
  }
}