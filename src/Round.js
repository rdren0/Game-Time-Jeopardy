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
    this.playerInd = -1;

  }
  sortClues () {
    this.roundClues.forEach((rndCat, ind) => {
      this.pointValues.forEach(value => {
        rndCat.push(this.baseData[ind].find(clue => clue.pointValue === value))
      })
    })
    domUpdates.displayCategories(this);
    this.setPlayer();
  }
  guessButton () {
    domUpdates.checkGuess(this, this.currentPlayer);
  }

  setPlayer(){
    this.playerInd++
    if (this.playerInd === 2) {
      this.currentPlayer = this.players[0];
      this.playerInd = -1;
    } else {
      this.currentPlayer = this.players[this.playerInd]
    }
  }
  playerSwitch(){
    this.setPlayer();
    domUpdates.returnBoard();
    console.log(this.players)
    this.setPlayer();
  }

}

export default Round;