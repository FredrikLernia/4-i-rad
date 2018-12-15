class PageContent extends Component {

  constructor(){
    super();
    this.startPage = new StartPage();
    this.gamePage = new GamePage();
    this.rulesPage = new RulesPage();
    this.highscorePage = new Highscore();
    this.missingPage = new MissingPage();
    this.loadLocalDB(); //Plug this puppy in when we are ready to do so (routing data to startpage for now)
  }

  async loadLocalDB(){
     // optional, this is if we want to load data from a JSON file
    // JSON._classes(MusiciansAndBands, Musicians, Bands, Musician, Band);
    let response = await JSON._load('localDB.json');
    if(response === null){ return; }
    // set the original id of musiciansAndBands
    // to get things into the "rendering loop"
    response.data._id = this.startPage._id;
    this.startPage = response.data;
    this.startPage.render();
  }

  
}