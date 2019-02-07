import chai from 'chai';
import Game from '../src/Game.js';
import RoundThree from '../src/RoundThree.js';
import domUpdates from '../src/domUpdates.js';
import spies from 'chai-spies';
chai.use(spies);
const expect = chai.expect;


describe ('RoundThree', () => {
    it ('should have default state', () => {
        const round = new RoundThree();
        expect(round.players).to.deep.equal([]);
        expect(round.currentPlayer).to.deep.equal({});
        expect(round.currentClue).to.deep.equal({});
        expect(round.baseData.length).to.equal(0); 
        expect(round.pointValues).to.deep.equal([100, 200, 300, 400]);
        expect(round.playerInd).to.equal(0);
        expect(round.turn).to.equal(12);
        expect(round.dDouble).to.equal(undefined);
        expect(round.wager).to.equal(undefined);
        expect(round.ddCount).to.equal(0);
        expect(round.finalClue).to.deep.equal({});
        expect(round.winner).to.deep.equal({});
    })

    it ('should be an instance of RoundThree extended Round', () => {
        const round = new RoundThree();
        expect(round).to.be.an.instanceof(RoundThree);
    })

    it ('should have only one category for final clue', () => {
        const game = new Game();
        game.start();
        game.createRound();
        game.createRound();
        const round = game.round;

        expect(round.roundClues.length).to.equal(1);
        expect(round.roundClues[0].length).to.be.at.least(5);
    })

    it('should have final clue with point value 400',() => {
        const game = new Game();
        game.start();
        game.createRound();
        game.createRound();
        const round = game.round;

        expect(round.finalClue).to.have.keys('question','categoryId', 'pointValue', 'answer');
        expect(round.finalClue.pointValue).to.equal(400);
    })
})