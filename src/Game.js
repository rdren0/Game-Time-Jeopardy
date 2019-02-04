import Player from './Player.js'
import domUpdates from './domUpdates.js';
import Round from './Round.js';
import data from './data.js'

class Game {
  constructor() {
    this.round = 0;
    this.players = [];
    this.allData = [[], [], [], [], [], [], [], [], [], []];
  }
  start() {
    this.createPlayers(domUpdates.grabNames());
    this.getRandomData();
    this.createRound();
  }

  createPlayers(array) {
    this.players = array.map(person => {
      return person = new Player(person);
    });
    this.shuffle(this.players);
    domUpdates.loadGameBoard(this.players);
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
  createRound () {
    let round = new Round(this.clueSet());
    this.round = round;
    round.sortClues(this);
  }
  clueSet () {
    return this.allData.splice(0, 4);
  }
  boardListener (e) {
    domUpdates.gameBoardListener(e, this)
    ;
  }
}

export default Game;