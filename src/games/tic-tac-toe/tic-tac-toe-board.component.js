import React from 'react';
import './tic-tac-toe-board.component.scss';

export default class TicTacToeBoard extends React.Component {

    constructor(props) {
        super(props);

        this.initBoard = this.initBoard.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkForWinner = this.checkForWinner.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.reset = this.reset.bind(this);
        this.getMaskStyle = this.getMaskStyle.bind(this);
        this.getLineStyle = this.getLineStyle.bind(this);

        this.state = {
            board: this.initBoard(),
            gameState: 'playing', // playing, gameOver
            currentPlayer: 'X',
            outcome: null,
            winType: null,
            winIndex: null,
        }
        
    }

    get dim() {
        return this.props.dim ? this.props.dim : 3;
    }

    get rows() {
        return this.state.board;
    }

    get columns() {
        let columns = [];
        for (let c = 0; c < this.state.board[0].length; c++) {
            let column = [];
            for (let r = 0; r < this.state.board.length; r++) {
                column.push(this.state.board[r][c]);
            }
            columns.push(column);
        }
        return columns;
    }

    get diagonals() {
        let diagonals = [[], []];
        for (let d = 0; d < this.state.board.length; d++) {
            diagonals[0].push(this.state.board[d][d]);
            diagonals[1].push(this.state.board[d][this.state.board.length - d - 1]);
        }

        return diagonals;
    }

    get cells() {
        let cells = [];
        for (let r = 0; r < this.state.board.length; r++) {
            cells = cells.concat(this.state.board[r]);
        }
        return cells;
    }

    initBoard() {
        let board = [];
        for (let r = 0; r < this.dim; r++) {
            let row = [];
            for (let c = 0; c < this.dim; c++) {
                row.push(null);
            }
            board.push(row);
        }
        return board;
    }

    handleClick(r, c) {
        let board = this.state.board;
        if (board[r][c] !== null) {
            let message = `This cell is already claimed by Player ${board[r][c]}`;
            console.warn(message);
            alert(message);
            return;
        }
        board[r][c] = this.state.currentPlayer;
        this.setState({ board, currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X' });

        this.checkForWinner();
    }

    gameOver(outcome, type, index) {

        // Log the result with the server (if there was a winner)
        if (outcome !== 'draw') {
            fetch('http://localhost:8080/wins', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    player: outcome,
                    game: 'Tic-Tac-Toe',
                    playedOn: new Date()
                })
            })
            .catch(error => console.error(error))
            .then(() => console.log('result logged'));
        }

        // Update the state of the game
        this.setState({
            gameState: 'gameOver',
            outcome,
            winType: type,
            winIndex: index
        });
    }  

    checkForWinner() {
        function isWinner(cells) {
            if (cells.filter(cell => cell === 'X').length === cells.length) return 'X';
            if (cells.filter(cell => cell === 'O').length === cells.length) return 'O';
            return null;
        }

        let winner = null;
        // Rows
        let rows = this.rows;
        for (let r = 0; r < rows.length; r++) {
            winner = isWinner(rows[r])
            if (winner !== null) {
                return this.gameOver(winner, 'row', r);
            }
        }

        // Columns
        let cols = this.columns;
        for (let c = 0; c < cols.length; c++) {
            winner = isWinner(cols[c])
            if (winner !== null) {
                return this.gameOver(winner, 'col', c);
            }
        }

        // Diagonals
        let diag = this.diagonals;
        for (let d = 0; d < diag.length; d++) {
            winner = isWinner(diag[d])
            if (winner !== null) {
                return this.gameOver(winner, 'diag', d);
            }
        }

        // DRAW
        if (this.cells.filter(cell => cell === null).length === 0) {
            return this.gameOver('draw', null, null);
        }
    }

    getMaskStyle() {
        switch (this.state.winType) {
            case 'row':
                return {
                    display: 'block',
                };
            case 'col':
                return {
                    display: 'block',
                    transform: 'rotate(90deg)',
                };
            case 'diag':
                return {
                    display: 'block',
                    transform: `${this.state.winIndex ? 'rotate(135deg)' : 'rotate(45deg)'}`
                };
            default:
                return null;
        }
    }

    getLineStyle() {
        switch (this.state.winType) {
            case 'row':
                return {
                    top: `${((2 * this.state.winIndex) + 1) * (100 / (2 * this.dim))}%`,
                    width: '100%',
                    transform: `translateY(-50%)`,
                };
            case 'col':
                return {
                    bottom: `${((2 * this.state.winIndex) + 1) * (100 / (2 * this.dim))}%`,
                    width: '100%',
                    transform: `translateY(50%)`,
                };
            case 'diag':
                return {
                    width: '100%',
                    top: '50%',
                    transform: `translateY(-50%)`,
                };
            default:
                return null;
        }
    }

    reset() {
        this.setState({
            board: this.initBoard(),
            gameState: 'playing',
            currentPlayer: 'X',
            outcome: null,
            winType: null,
            winIndex: null,
        });
    }

    render() {
        return (
            <div>
                <div className="board-container">
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <table>
                            <tbody>
                                {this.state.board.map((row, r) => 
                                    <tr key={r}>
                                        {row.map((cell, c) => 
                                            <td key={c} onClick={() => this.handleClick(r, c)}>{cell}</td>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="win-line-mask" style={this.getMaskStyle()}>
                            <div className="line" style={this.getLineStyle()}></div>
                        </div>
                    </div>
                    

                    {this.state.gameState === 'gameOver' ?
                        <div className="board-overlay">
                            <div className="board-overlay-content">
                                <h1>Game Over</h1>
                                <p>Winner: {this.state.outcome}</p>
                                <button className="btn btn--white-ghost" onClick={this.reset}>New Game</button>
                            </div>
                        </div>
                    : null}
                    
                </div>
                <p>Current Player: {this.state.currentPlayer}</p>
            </div>
        );
    }
}