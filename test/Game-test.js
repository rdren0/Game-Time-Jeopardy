import chai from 'chai';
import Game from '../src/Game.js';
import domUpdates from '../src/domUpdates.js';
import spies from 'chai-spies';
chai.use(spies);
const expect = chai.expect;

chai.spy.on(domUpdates, 'grabNames',  () => [1, 2, 3]);
chai.spy.on(domUpdates, 'loadGameBoard', () => true);
describe('Game', () => {
  it('should be an instance of Game', () =>{
    const game = new Game();
    expect(game).to.be.an.instanceof(Game);

  })

  it('should have default properties', ()=>{
    const game = new Game();
    expect(game.players).to.deep.equal([]);
    expect(game.round).to.equal(0);
    expect(game.allData).to.deep.equal([[],[],[],[],[],[],[],[],[],[]]);

  })

  it('should create an array of 3 players', () =>{
    const game = new Game();
    expect(game.players).to.deep.equal([]);
    game.createPlayers(['mike', 'jill', 'megan']);
    expect(game.players.length).to.equal(3);
    expect(games.players).to.includes('mike');
    expect(games.players).to.includes('megan');
    expect(games.players).to.includes('jill');
    expect(domUpdates.loadGameBoard).to.have.been.called;



  })

  // it ('should create new player objects', () => {
  //   const game = new Game();
  //   game.createPlayers(['mike', 'jill', 'megan']);
  //   expect(...game.players).to.be.an('object');
  // }) 

  // it ('should start intial game state', () => {
  //   const game = new Game();
  //   game.start();
  //   // game.createPlayers(['mike', 'jill', 'megan']);
  //   expect(game.round).to.be.an('object');
  // })



})

