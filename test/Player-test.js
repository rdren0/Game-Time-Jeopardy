import chai from 'chai';
import Player from '../src/Player.js'
const expect = chai.expect;

describe ('Player', () => {
  it ('should have default state', () => {
    const player = new Player();
    expect(player.name).to.equal('PLAYER');
    expect(player.score).to.equal(0);
    expect(player.answer).to.equal('');
    expect(player.wager).to.equal(0);
  })
    
  it ('should be able to have a name', () => {
    const player = new Player('Robbie');
    expect(player.name).to.equal('Robbie');  
  })
})