import Round from './Round.js';

class RoundThree extends Round {
  constructor(baseData, players) {
    super(baseData, players);
    this.finalClue = 0;
    this.wagers = [];
  }
  grabClue () {
    console.log(this)
    this.roundClues = this.baseData.splice(0,1)
    this.finalClue = this.roundClues[0][5];
    
  }
  displayRound () {
    domUpdates.roundThree();
    domUpdates.displayCategories(this)
    // display clue and guess inputs
  }
  displayAnswer () {
    // display answer 
  }
  displayWinner () {

  }
}


export default RoundThree;