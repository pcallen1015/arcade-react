import React from 'react';
import './rock-paper-scissors.game.scss';

const MOVES = ['rock', 'paper', 'scissors'];
const WIN_STATES = [
    ['rock', 'scissors'],
    ['paper', 'rock'],
    ['scissors', 'paper']
];
const MOVE_TIME_LIMIT = 3;

export default class RockPaperScissorsGame extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            moves: MOVES,
            gameState: 'ready', // ready, choosingMove, gameOver
        }

        this.start = this.start.bind(this);
        this.chooseMove = this.chooseMove.bind(this);
        this.newGame = this.newGame.bind(this);
    }

    start() {
        console.info('Starting a new Rock-Paper-Scissors game');
        this.setState({
            gameState: 'choosingMove',
            timeRemaining: MOVE_TIME_LIMIT,
            playerMove: null,
            opponentMove: MOVES[Math.floor(Math.random() * (MOVES.length - 1))],
            outcome: null,
        });

        // Ensure the timer is cleared before starting (or restarting) it
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            const remaining = this.state.timeRemaining - 1;
            this.setState({ timeRemaining: remaining });
            if (this.state.timeRemaining <= 0) {
                clearInterval(this.timer);

                let result;
                // Check result
                const winStrings = WIN_STATES.map(state => state.join('/'));
                const moves = [this.state.playerMove, this.state.opponentMove];

                if ((this.state.playerMove && !this.state.opponentMove) || (winStrings.indexOf(moves.join('/')) > -1)) result = 'win';
                else if ((this.state.opponentMove && !this.state.playerMove) || (winStrings.indexOf(moves.reverse().join('/')) > -1)) result = 'lose';
                else result = 'draw';

                // TODO: report result

                this.setState({ gameState: 'gameOver', outcome: result });
            }
        }, 1000);
    }

    chooseMove(choice) {
        console.info(`Player chose: ${choice}`);
        this.setState({ playerMove: choice });
    }

    newGame() {
        this.start();
    }

    renderGameContent() {
        switch (this.state.gameState) {
            case 'ready':
                return <button className="btn" onClick={this.start}>Start!</button>;
            case 'choosingMove':
                return (
                    <div>
                        <h1>Quick!</h1>
                        <h2>Choose your move!</h2>
                        <h3>Tiem Remaining: {this.state.timeRemaining}</h3>
                        <div className="moves">
                            {this.state.moves.map(move => <button key={move} className={'btn ' + (this.state.playerMove === move ? 'selected' : '')} onClick={() => this.chooseMove(move)}>{move.toString().toUpperCase()}</button>)}
                        </div>
                    </div>
                );
            case 'gameOver':
                return (
                    <div>
                        <h1>Result: {this.state.outcome.toUpperCase()}</h1>
                        <h3>Opponent's Move: {(this.state.opponentMove || 'none').toUpperCase()}</h3>
                        <h3>Your Move: {(this.state.playerMove || 'none').toUpperCase()}</h3>
                        <button className="btn" onClick={this.newGame}>Play Again</button>
                    </div>
                );
            default:
                return <div>Invalid Game State</div>;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="content">
                    {this.renderGameContent()}
                </div>
            </div>
        );
    }
}