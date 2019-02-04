import Game from './Game.js'
import domUpdates from './domUpdates.js';

class Round {
  constructor(baseData) {
    this.players = [];
    this.currentPlayer = 0;
    this.turnNum = 0;
    this.currentClue = 0;
    this.baseData = baseData;
    this.roundClues = [[], [], [], []];
    this.pointValues = [100, 200, 300, 400];

  }
  sortClues () {
    this.roundClues.forEach((rndCat, ind) => {
      this.pointValues.forEach(value => {
        rndCat.push(this.baseData[ind].find(clue => clue.pointValue === value))
      })
    })
    console.log(this);
    domUpdates.displayCategories(this);
    this.setPlayer();
  }
  guessButton (e) {
    domUpdates.checkGuess(e, this, this.currentPlayer);
  }

  setPlayer(){
    console.log(this.players);
    this.currentPlayer = this.players[0];
  }
  playerSwitch(){
    let lastPlayer = this.players.shift();
    this.players = this.players.push(lastPlayer);
    this.setPlayer();
  }

}

export default Round;