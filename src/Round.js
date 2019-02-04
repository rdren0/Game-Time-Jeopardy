import Game from './Game.js'
import domUpdates from './domUpdates.js';

class Round {
  constructor(baseData) {
    this.turnNum = 1;
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
    domUpdates.displayCategories(this);
  }
  guessButton (e) {
    domUpdates.checkGuess(e, this);
  }

}

export default Round;