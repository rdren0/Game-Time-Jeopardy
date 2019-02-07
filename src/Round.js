import Game from './Game.js'
import domUpdates from './domUpdates.js';

class Round {
  constructor(baseData = [], players = []) {
    this.players = players;
    this.currentPlayer = {};
    this.currentClue = {};
    this.baseData = baseData;
    this.roundClues = [[], [], [], []];
    this.pointValues = [100, 200, 300, 400];
    this.playerInd = 0;
    this.turn = 12;
    this.dDouble = undefined; 
    this.wager = undefined;
    this.ddCount = 0;
  }
  sortClues () {
    this.roundClues.forEach((rndCat, ind) => {
      this.pointValues.forEach(value => {
        rndCat.push(this.baseData[ind].find(clue => clue.pointValue === value))
      })
    })
    domUpdates.displayCategories(this);
    this.setPlayer();
    this.dDouble = this.ddTurn()
  }
  guessButton () {
    domUpdates.checkGuess(this, this.currentPlayer, this.wager);
  }
  setPlayer() {
    this.currentPlayer = this.players[this.playerInd]
    domUpdates.activePlayer(this);
    if (this.playerInd === 2) {
      this.playerInd = 0;
      return
    }
    this.playerInd++
  }
  gameRotation(game) {
    this.turn--;
    this.setPlayer();
    domUpdates.returnBoard();
    if (this.turn === 0) {
      game.createRound(this.players);
    }
  }
  ddTurn () {
    return Math.floor(Math.random() * Math.floor(this.turn)) + 1;
  }
  dailyDouble (e, game) {
    this.ddCount++;
    if (game.roundCount === 2 && this.ddCount === 1) {
      this.dDouble = this.ddTurn();
    }
    domUpdates.dailyDouble(e, game);
  }
}

export default Round;