import Round from './Round.js';

class RoundThree extends Round {
  constructor(baseData, players = []) {
    super(baseData, players = []);
    this.finalClue = 0;
    this.roundClues = this.baseData;
    this.wagers = [];
  }
  grabClue () {
    // this.roundClues.splice(0,1)
    // this.finalClue = this.roundClues[0][5];
    // domUpdates.roundThree();
    // domUpdates.displayCategories(this)
    
  }
  displayClue () {
    // display clue and guess inputs
  }
  displayAnswer () {
    // display answer 
  }
  displayWinner () {

  }
}


export default DailyDouble;