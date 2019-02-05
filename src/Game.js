import Player from './Player.js'
import domUpdates from './domUpdates.js';
import Round from './Round.js';
import data from './data.js'

class Game {
  constructor() {
    this.round = 0;
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
  createRound () {
    let round;
    if (!this.round ) {
      round = new Round(this.clueSet());
      this.round = round;
    } else {
      console.log(this.allData)
      round = new Round(this.clueSet(), this.players)
      this.round = round;
      domUpdates.newRound();
      round.sortClues()
    }
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