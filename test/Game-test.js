import chai from 'chai';
import Game from '../src/Game.js';
import domUpdates from '../src/domUpdates.js';
import spies from 'chai-spies';
chai.use(spies);
const expect = chai.expect;

chai.spy.on(domUpdates, 'grabNames',  () => [1, 2, 3]);
chai.spy.on(domUpdates, ['loadGameBoard', 'displayCategories', 'gameBoardListener'], () => true);

describe('Game', () => {
  let game;
  beforeEach(() => {
    game = new Game();
  })
  it('should be an instance of Game', () =>{
    expect(game).to.be.an.instanceof(Game);
  })

  it('should have default properties', ()=>{
    expect(game.players).to.deep.equal([]);
    expect(game.round).to.equal(0);
    expect(game.allData).to.deep.equal([[], [], [], [], [], [], [], [], [], []]);

  })

  it('should create an array of 3 players', () =>{
    expect(game.players).to.deep.equal([]);
    game.createPlayers(['mike', 'jill', 'megan']);
    expect(game.players.length).to.equal(3);

    game.players.forEach((player, ind) => {
      expect(game.players[ind]).to.have.keys('name', 'score', 'turn', 'wager');
    })
    expect(domUpdates.loadGameBoard).to.have.been.called;
  })

  it ('should gather all data on start', () => {
    expect(game.allData).to.deep.equal([[], [], [], [], [], [], [], [], [], []]);
    game.start();
    game.allData.forEach((cat) => {
      expect(cat.length).to.be.at.least(5);
    })
  })
  it('should be able to create round object', () => {
    game.start();
    expect(game.round).to.be.an('object');
  })

  it('should have 4 less categories after round 1 & 2', () => {
    game.start();
    expect(game.allData.length).to.equal(6);
    //game.createRound();
    //expect(game.allData.length).to.equal(2);
  })

  it('should listen for clicks on game board', () => {
    game.boardListener()
    expect(domUpdates.gameBoardListener).to.have.been.called;
  })


})

