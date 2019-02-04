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
      console.log(currentQuestion);
      this.checkGuess(currentQuestion);
      break;
    case classItem.includes('200-val'):
      currentQuestion = game.round.roundClues[categoryIndex][1];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      console.log(currentQuestion);
      this.checkGuess(currentQuestion);
      break;
    case classItem.includes('300-val'):
      currentQuestion = game.round.roundClues[categoryIndex][2];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      console.log(currentQuestion);
      this.checkGuess(currentQuestion, round);
      break;
    case classItem.includes('400-val'):
      currentQuestion = game.round.roundClues[categoryIndex][3];
      event.target.classList.add('question-used');
      game.round.currentClue = currentQuestion;
      this.addQuestionDom(currentQuestion);
      console.log(currentQuestion);
      this.checkGuess(currentQuestion);
      break;
      
      

    }

  },
    checkGuess(currentQuestion) {
      var correctAnswer = `<section class="question-display"><h1 class="question-title">"${currentQuestion.question} "</h1>
            <h2>You are correct!</h2>
            <label>Next Player?</label>
            <input class="guess-text">
            <br>
            <button class="guess-button">Continue</button></section>`;
      var wrongAnswer = `
            <section class="question-display">
            <h1 class="question-title">You guessed wrong!</h1>
            <h2 class="correct-answer">The correct answer was <span>${currentQuestion.answer}</span></h2>
            <label>Next Player?</label>
            <input class="guess-text">
            <br>
            <button class="guess-button">Continue</button></section>`;
      var questionAnswer = currentQuestion.answer.toLowerCase();
      if(questionAnswer === $('.guess-text').value){
        $('.clue').html(correctAnswer);
        this.player.score += guess.pointValue;
      } else if (questionAnswer !== $('.guess-text').value){
        $('.clue').html(wrongAnswer);
        this.player.score -= guess.pointValue;
      }else{
        alert("No answer given!")
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
}


