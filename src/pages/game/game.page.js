import React from 'react';
import { Link } from 'react-router-dom';
import './game.page.scss';
import RockPaperScissorsGame from '../../games/rock-paper-scissors/rock-paper-scissors.game';
import TicTacToeGame from '../../games/tic-tac-toe/tic-tac-toe.game';

export default class GamePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameID: props.match.params.gameID
        }

        this.getGame = this.getGame.bind(this);
        this.newGame = this.newGame.bind(this);
    }

    getGame() {
        switch (this.state.gameID) {
            case 'tic-tac-toe':
                return <TicTacToeGame></TicTacToeGame>
            case 'rock-paper-scissors':
                return <RockPaperScissorsGame></RockPaperScissorsGame>
            default:
                return <div>Game Not Found</div>
        }
    }

    newGame() {
        
    }

    render() {
        return (
            <div className="game-view">
                <div className="header">
                    <h1>{this.state.gameID}</h1>
                </div>

                <div className="game">
                    {this.getGame()}
                </div>

                <div className="navigation">
                    <Link to="/" className="btn">Back to Games</Link>
                    <button className="btn" onClick={this.newGame}>New Game</button>
                </div>
            </div>
        );
    }
}