import Game from './Game.js'
import domUpdates from './domUpdates.js';

class Round {
  constructor(baseData, players = []) {
    this.players = players;
    this.currentPlayer = 0;
    this.turnNum = 0;
    this.currentClue = 0;
    this.baseData = baseData;
    this.roundClues = [[], [], [], []];
    this.pointValues = [100, 200, 300, 400];
    this.playerInd = -1;
    this.turn = 12;
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
    if (this.playerInd === 3) {
      this.currentPlayer = this.players[0];
      this.playerInd = -1;
    } else {
      this.currentPlayer = this.players[this.playerInd]
    }
  }
  playerSwitch(game){
    console.log(this.turn)
    this.turn--;
    this.setPlayer();
    domUpdates.returnBoard();
    if (this.turn === 0) {
      game.createRound(this.players);
    }
  }
}

export default Round;