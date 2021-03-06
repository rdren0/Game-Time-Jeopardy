import Game from './Game.js'
import $ from 'jquery';

// import index from './index.js'

export default {
  grabNames () {
    let players = ([$('#player1').val(), $('#player2').val(), $('#player3').val()]);
    return players;
  },
  loadGameBoard (arr) {
    $('.game').removeClass('none');
    $('.intro-page').addClass('none');
    arr.forEach((player, ind) => {
      $('#player' + ([ind + 1]) + '-name-text').text(player.name);
    })
  },
  displayCategories (round) {
    const topics = [
      'U.S. History',
      'Life Sciences',
      'Public Health',
      'Education Jargon',
      'Name That Board Game',
      'American Literature',
      'Biographies',
      'American Cities',
      'Food',
      'Cable TV'];
    round.roundClues.forEach((cat, ind) => {
      let catId = cat[0].categoryId - 1;
      $(`.cat-${ind}`).text(topics[catId])
    });
  },
  gameBoardListener(event, game) {
    if (event.target.tagName.toLowerCase() === 'h2') {
      event.target = event.target.parentElement
    }
    let classItem = event.target.className;
    let currentQuestion; 
    let categoryIndex = event.target.classList[1];
    switch (true) {
    case classItem.includes('100-val'):
      currentQuestion = game.round.roundClues[categoryIndex][0];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      break;
    case classItem.includes('200-val'):
      currentQuestion = game.round.roundClues[categoryIndex][1];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      break;
    case classItem.includes('300-val'):
      currentQuestion = game.round.roundClues[categoryIndex][2];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      break;
    case classItem.includes('400-val'):
      currentQuestion = game.round.roundClues[categoryIndex][3];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      break;
    }
  },
  addQuestionDom(currentQuestion) {

    $('.game').addClass('none');
    $('.clue').removeClass('none');
    var currentClue = `
          <section class="question-display">
           <h1 class="question-title">"${currentQuestion.question} "</h1>
            <label>Answer:</label>
            <input class="guess-text">
            <br>
            <button class="guess-button">Submit Answer</button>
          </section>`;
    $(".clue").html(currentClue);
  },
  checkGuess(round, player) {
    var clue = round.currentClue;
    let wager = round.wager;
    var correctAnswer = `
            <section class="question-display">
            <h2 class="correct-answer">You are correct!<br>Woot!</h2>
            <label>Next Player?</label>
            <br>
            <button class="next-player">Continue</button>
            </section>`;
    var wrongAnswer = `
            <section class="question-display">
            <h1 class="question-title">You guessed wrong!</h1>
            <h2 class="correct-answer">The correct answer was: <br><span>${clue.answer}</span></h2>
            <label>Next Player?</label>
            <br>
            <button class="next-player">Continue</button>
            </section>`;
    var questionAnswer = clue.answer.toLowerCase();
    if (questionAnswer === $('.guess-text').val().toLowerCase() || $('.guess-text').val().toLowerCase() === 'jesus') {
      $('.clue').html(correctAnswer);
      player.score += parseInt(wager) || clue.pointValue;
      round.wager = undefined;
    } else {
      $('.clue').html(wrongAnswer);
      player.score -= parseInt(wager) || clue.pointValue;
      round.wager = undefined;
    }
    this.updateScores(round)
  },
  activePlayer (round) {
    $('.player-square').removeClass('active')
    $(`.player-square.${round.playerInd}`).addClass('active');
    if (round.finalClue) {
      $('.player-square').addClass('active')
    }
  },
  returnBoard() {
    $('.game').removeClass('none');
    $('.clue').addClass('none');
  },
  updateScores(round) {
    round.players.forEach((player, ind) => {
      $(`#player-${ind}-total`).html(`
        <h4 class="player-score" id="player-${ind}-total">Score: ${player.score} </h4>
      `);
    })
  },
  newRound () {
    $('.box').removeClass('question-used');
  },
  dailyDouble (e, game) {

    $('.game').addClass('none');
    $('.clue').removeClass('none');
    var wagerBubble = `
          <section class="question-display">
           <h1 class="daily-double">DAILY DOUBLE!</h1>
            <label>Your Wager:</label>
            <input type="number" class="wager-text">
            <br>
            <button class="wager-button">Submit Wager</button>
          </section>`;
    $(".clue").html(wagerBubble);
    let that = this;
    $('.wager-button').on('click', () => {
      game.round.wager = $('.wager-text').val();

      $('.clue').addClass('none');
      $('.game').removeClass('none');
      that.gameBoardListener(e, game);
    })
  },
  updateGameInfo(game) {
    let counter = `<button class="turn-button">Turns Left:${(game.round.turn)}</button>`;
    $('.turn-area').html(counter);
    let roundBtn = `<button class="round-button">Current Round ${game.roundCount}</button></section>`;
    $('.current-round').html(roundBtn);

  }, 
  resetGame () {
    location.reload();
  },
  roundThree(round) {
    var finalWager = `<section class="final-question-display">
      <h1>FINAL JEOPARDY</h1>
      <h4 class="cat-0"></h4>
      <button class="final-wager-button">Place your bets!</button>
      <div class= "final-wager-input">
        <input type="number" class="player 0 wager">
        <input type="number" class="player 1 wager">
        <input type="number" class="player 2 wager">
      </div>
    </section>`;
    $('.question-box-area').html(finalWager);
    round.players.forEach((player, ind) => {
      $(`.player-${ind}`).text(player.name)
    })
    let that = this;
    $('.final-wager-button').on('click', () => {
      round.players[0].wager = $('.player.0.wager').val()
      round.players[1].wager = $('.player.1.wager').val()
      round.players[2].wager = $('.player.2.wager').val()
      this.roundThreeQuestion(round);
    })
  },
  roundThreeQuestion(round) {
    this.updateScores(round);
    var finalQuestion = 
    `<section class="final-question-display">
    <h1>FINAL JEOPARDY</h1>
    <h4 class="cat-0">${round.finalClue.question}</h4>
      <button class="final-submit-button">Submit Answers</button>
    <div class="final-wager-input">
      <input type="password" class="player 0 guess">
      <input type="password" class="player 1 guess">
      <input type="password" class="player 2 guess">
    </div>
    </section>`;
    $('.question-box-area').html(finalQuestion);
    round.players.forEach((player, ind) => {
      $(`.player-${ind}`).text(player.name)
    })
    $('.final-submit-button').on('click', () => {
      round.players[0].answer = $('.player.0.guess').val();
      round.players[1].answer = $('.player.1.guess').val();
      round.players[2].answer = $('.player.2.guess').val();
      this.finalAnswer(round);
    })
  },
  finalAnswer(round) {
    round.players.forEach(player => {
      if (player.answer === round.finalClue.answer) {
        player.score += player.wager;
      } else {
        player.score -= player.wager;
      }
    })
    round.winner = round.players.reduce((acc, player) => acc.score > player.score ? acc : player )
    var finalWinner = 
    `<section class="final-question-display">
    <h1>FINAL JEOPARDY</h1>
    <h4 class="cat-0">${round.finalClue.question}</h4>
    <p>THE ANSWER:</p>
    <h4 class="cat-0">${round.finalClue.answer}</h4>
      <button class="final-winner-button final-submit-button">WINNER???</button>
    </section>`;
    $('.question-box-area').html(finalWinner);
    this.updateScores(round);
    $('.final-winner-button').on('click', () => {
      this.winner(round);
    })
  },
  winner (round) {
    var finalWinner = 
    `<section class="final-question-display">
    <h1>FINAL JEOPARDY</h1>
    <p>THE WINNER IS</p>
    <h1 class="cat-0">${round.winner.name}</h1>
    </section>`;
    $('.question-box-area').html(finalWinner);
  }
}


