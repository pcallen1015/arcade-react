import React from 'react';
import RockPaperScissorsGame from '../../games/rock-paper-scissors/rock-paper-scissors.game';
import TicTacToeGame from '../../games/tic-tac-toe/tic-tac-toe.game';

export default class GamePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameID: props.match.params.gameID
        }

        this.getGame = this.getGame.bind(this);
    }

    getGame() {
        switch(this.state.gameID) {
            case 'tic-tac-toe':
                return <TicTacToeGame></TicTacToeGame>
            case 'rock-paper-scissors':
                return <RockPaperScissorsGame></RockPaperScissorsGame>
            default:
                return <div>Game Not Found</div>
        }
    }

    render() {
        return this.getGame();
    }
}