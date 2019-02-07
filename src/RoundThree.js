import Round from './Round.js';
import domUpdates from './domUpdates.js';

class RoundThree extends Round {
  constructor(baseData = [], players = []) {
    super(baseData, players);
    this.finalClue = {};
    this.winner = {};
  }
  grabClue () {
    this.turn = 1;
    this.roundClues = this.baseData.splice(0, 1)
    this.finalClue = this.roundClues[0].find(clue => clue.pointValue === 400);
  }
  displayRound () {
    domUpdates.roundThree(this);
    domUpdates.displayCategories(this)
    domUpdates.activePlayer(this)
  }
}


export default RoundThree;