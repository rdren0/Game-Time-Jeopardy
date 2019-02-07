import chai from 'chai';
import Game from '../src/Game.js';
import domUpdates from '../src/domUpdates.js';
import spies from 'chai-spies';
import RoundThree from '../src/RoundThree.js';
import Round from '../src/Round.js';
import Player from '../src/Player.js';
import $ from 'jquery';
chai.use(spies);
const expect = chai.expect;

chai.spy.on(domUpdates, 'grabNames',  () => [1, 2, 3]);
chai.spy.on(domUpdates, ['loadGameBoard', 'displayCategories', 'gameBoardListener', 'updateGameInfo','newRound', 'roundThree', 'resetGame'], () => true);

describe('Game', () => {
  let game;
  beforeEach(() => {
    game = new Game();
  })
  it('should be an instance of Game', () =>{
    expect(game).to.be.an.instanceof(Game);
  })

  it('should have default properties', ()=>{
    expect(game.roundCount).to.equal(0);
    expect(game.round).to.equal(0);
    expect(game.allData).to.deep.equal([[], [], [], [], [], [], [], [], [], []]);
  })
  
  it('should be able to have three player objects', () => {
    game.createRound();
    game.createPlayers(['Pam','Robbie','Brittany']);
    expect(game.round.players.length).to.equal(3);
    game.round.players.forEach(player => {
      expect(player).to.be.an.instanceOf(Player);
    })
    expect(domUpdates.loadGameBoard).to.have.been.called;
  })
  
  it ('should gather all data on start', () => {
    expect(game.allData).to.deep.equal([[], [], [], [], [], [], [], [], [], []]);
    game.getRandomData();
    game.allData.forEach((cat) => {
      expect(cat.length).to.be.at.least(5);
    })
  })

  it('should be able to create consecutive rounds', () => {
    expect(game.roundCount).to.equal(0);

    game.createRound();
    expect(game.roundCount).to.equal(1);
    expect(game.round).to.be.an.instanceof(Round)
    
    game.createRound();
    expect(game.roundCount).to.equal(2);
    expect(game.round).to.be.an.instanceof(Round)
    game.getRandomData()
    game.round.roundClues.forEach(cat => {
      expect(cat.length).to.equal(4);
    })
    expect(domUpdates.newRound).to.have.been.called;
    
    game.createRound();
    expect(game.roundCount).to.equal(3);
    expect(game.round).to.be.an.instanceof(RoundThree)
    expect(domUpdates.roundThree).to.have.been.called;
    expect(domUpdates.displayCategories).to.have.been.called;
  })

  it('should have 4 less categories after both round 1 & 2', () => {
    game.getRandomData();
    game.clueSet();
    expect(game.allData.length).to.equal(6);
    
    game.clueSet();
    expect(game.allData.length).to.equal(2);
  })

  it('should listen for clicks on game board', () => {
    game.boardListener()
    expect(domUpdates.gameBoardListener).to.have.been.called;
    expect(domUpdates.updateGameInfo).to.have.been.called;
  })
  
  it('should be able to reset game ', () => {
    game.reset();
    expect(domUpdates.resetGame).to.have.been.called;
  })


})

