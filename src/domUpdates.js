import Game from './Game.js'
import index from './index.js'

export default {
  grabNames () {
    let players = ([$('#player1').val(), $('#player2').val(), $('#player3').val()]);
    return players;
  },
  loadGameBoard (arr) {
    $('.entry-page').attr('class', 'game-board-area');
    $('.intro-page').attr('class', 'entry-page');
    arr.forEach((player, ind) => {
      $('#player' + ([ind + 1]) + '-name-text').text(player.name);
    })
  },
  displayCategories (round) {
    const topics = [
      'United States History',
      'Life Sciences',
      'Public Health',
      'Education Jargon',
      'Name That Board Game',
      'American Literature',
      'Biographies',
      'American Cities',
      'Food',
      'Cable TV'];
    
    for (let ind = 0; ind < 5; ind++)  {
      let firstClue = round.roundClues[ind][0].categoryId;
      $(`.cat-${ind}`).text(topics[firstClue - 1])
    }
  },
  gameBoardListener(event, game) {
    if (event.target.tagName.toLowerCase() === 'h2') {
      event.target = event.target.parentElement
    }
    let classItem = event.target.className;
    let currentQuestion; 
    let categoryIndex = event.target.classList[1];
    console.log(categoryIndex);
    switch (true) {
    case classItem.includes('100-val'):
      currentQuestion = game.rounds[0].roundClues[categoryIndex][0];
      event.target.classList.add('question-used');
      addQuestionDom(currentQuestion);
      console.log(currentQuestion);
      break;
    case classItem.includes('200-val'):
      currentQuestion = game.rounds[0].roundClues[categoryIndex][1];
      event.target.classList.add('question-used');
      console.log(currentQuestion);
      break;
    case classItem.includes('300-val'):
      currentQuestion = game.rounds[0].roundClues[categoryIndex][2];
      event.target.classList.add('question-used');
      console.log(currentQuestion);
      break;
    case classItem.includes('400-val'):
      currentQuestion = game.rounds[0].roundClues[categoryIndex][3];
      event.target.classList.add('question-used');
      console.log(currentQuestion);
      break;
    }

  },
  addQuestionDom(currentQuestion) {
  var questionSection = document.querySelector(".question-section");
  var currentClue = `
           <h1 class="question-area">${currentQuestion.question}</h1>
            <h2>Please enter an answer</h2>
            <label>Answer:</label>
            <input>
            <button>Submit Answer</button>`;
          questionSection.insertAdjacentHTML('afterbegin',currentClue);
      }
}


