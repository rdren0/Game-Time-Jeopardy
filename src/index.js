
import Game from './Game.js';
import Player from './Player.js';
import Round from './Round.js';
import domUpdates from './domUpdates.js';
import Clue from './Clue.js';
import Data from './data.js'
import './css/base.css';
import $ from 'jquery';
import './images/player1.svg';
import './images/player2.svg';
import './images/player3.svg';



let game;


$('.start-game').on('click', (e) => {
  e.preventDefault();
  game = new Game();
  game.start();
});

$('.box').on('click', (e) => {
  if (game.round.turn === game.round.dDouble) {
    game.round.dailyDouble(e, game);
  } else {
    game.boardListener(e); 
  }
});

$('.clue').on('click', () => {
  let click = event.target.className;
  if (click === 'guess-button') {
    game.round.guessButton();
  }
  if (click === 'next-player') {
    game.round.gameRotation(game);
  }
})

$('.reset-button').on('click', () => {
  game.reset();
})

