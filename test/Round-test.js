import chai from 'chai';
import Game from '../src/Game.js';
import Round from '../src/Round.js';
import domUpdates from '../src/domUpdates.js';
import spies from 'chai-spies';
chai.use(spies);
const expect = chai.expect;

chai.spy.on(domUpdates, ['checkGuess', 'returnBoard', 'dailyDouble'], () => true);
describe ('Round', () => {
    let game;
    beforeEach(() => {
        game = new Game();
        game.getRandomData();
        game.createRound();
      })

    it ('should be instance of the Round class', () => {
        expect(game.round).to.be.an.instanceof(Round);
    })

    it ('should have default state', () => {
        let round = game.round;
        expect(round.players).to.deep.equal([]);
        expect(round.currentPlayer).to.deep.equal({});
        expect(round.currentClue).to.deep.equal({});
        expect(round.baseData.length).to.equal(4);
        expect(round.pointValues).to.deep.equal([100, 200, 300, 400]);
        expect(round.playerInd).to.equal(-1);
        expect(round.turn).to.equal(1);
        expect(round.dDouble).to.equal(undefined);
        expect(round.wager).to.equal(undefined);
        expect(round.ddCount).to.equal(0);
    })
    
    it ('should sort base data into round clues', () => {
        const round = game.round;
        const initialDD = round.dDouble;
        game.round.sortClues();
        expect(round.roundClues).to.not.deep.equal(round.baseData);
        round.roundClues.forEach(cat => {
            expect(cat.length).to.equal(4);
        });
        expect(domUpdates.displayCategories).to.have.been.called;
        expect(initialDD).to.not.equal(round.dDouble);
    })

    it('should rotate player turn', () =>{
        const round = game.round;
        game.createPlayers(['Pam','Robbie','Brittany'])
        const turnOne = round.currentPlayer
        const indOne = round.playerInd;
        
        console.log(round.players[0])
        round.setPlayer();
        expect(round.currentPlayer).to.not.deep.equal(turnOne);
        expect(round.playerInd).to.not.equal(indOne);
        const turnTwo = round.currentPlayer;
        const indTwo = round.playerInd;

        round.setPlayer();
        expect(round.currentPlayer).to.not.deep.equal(turnTwo);
        expect(round.playerInd).to.not.equal(indTwo);

        round.setPlayer();
        round.setPlayer();
        expect(round.currentPlayer).to.deep.equal(turnOne);
        expect(round.playerInd).to.equal(indOne);
    })
})