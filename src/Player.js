import Game from './Game.js';

class Player {
  constructor(name = 'PLAYER') {
    this.name = name;
    this.score = 0;
    this.answer = '';
    this.wager = 0;
  }
}

export default Player;