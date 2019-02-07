import Player from './Player.js'
import domUpdates from './domUpdates.js';
import Round from './Round.js';
import data from './data.js';
import RoundThree from './RoundThree.js';


class Game {
  constructor() {
    this.round = 0;
    this.roundCount = 0;
    this.allData = [[], [], [], [], [], [], [], [], [], []];
  }
  start() {
    this.getRandomData();
    this.createRound();
    this.createPlayers(domUpdates.grabNames());
  }

  createPlayers(array) {
    this.round.players = array.map(person => {
      return person = new Player(person);
    });
    domUpdates.loadGameBoard(this.round.players);
    this.round.sortClues(this);
  }
  getRandomData () {
    this.allData.forEach((cat, ind) => {
      data.clues.forEach(clue => { 
        if (clue.categoryId === (ind + 1)) {
          cat.push(clue);
        }
      })
    });
    this.shuffle(this.allData).forEach(cat => this.shuffle(cat));
  }
  shuffle (a) {
    return a.sort(() => 0.5 - Math.random());
  }
  createRound (players) {
    this.roundCount++;
    domUpdates.updateGameInfo(this);
    if (this.roundCount === 1) {
      this.round = new Round(this.clueSet());
    } else if (this.roundCount === 2) {
      this.round = new Round(this.clueSet(), players)
      domUpdates.newRound();
      this.round.sortClues();
    } else {
      this.round = new RoundThree(this.allData, players);
      this.round.grabClue(this.round);
      this.round.displayRound();
      domUpdates.updateGameInfo(this);
    }
  }
  clueSet () {
    return this.allData.splice(0, 4);
  }
  boardListener (e) {
    domUpdates.gameBoardListener(e, this);
    domUpdates.updateGameInfo(this);
  }
  reset () {
    domUpdates.resetGame();
  }
}

export default Game;