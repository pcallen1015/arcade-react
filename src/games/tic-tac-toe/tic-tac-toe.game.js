import React from 'react';
import TicTacToeBoard from './tic-tac-toe-board.component';

export default class TicTacToeGame extends React.Component {

    constructor(props) {
        super(props);

        this.board = React.createRef();

        this.state = {
            gameState: 'ready', // ready, playing, over, draw
        };
    }

    newGame() {
        this.board.current.reset();
    }

    render() {
        return <TicTacToeBoard ref={this.board}></TicTacToeBoard>;
    }
}