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
        this.getWinLineStyle = this.getWinLineStyle.bind(this);

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

    getWinLineStyle() {
        switch (this.state.winType) {
            case 'row':
                return {
                    display: 'block',
                    width: '100%',
                    height: '10px',
                    top: `${((2 * this.state.winIndex) + 1) * (100 / (2 * this.dim))}%`,
                    left: '0%',
                    transform: `translateY(-50%) rotate(0deg)`,
                    transition: 'width 1s ease-in-out',
                };
            case 'col':
                return {
                    display: 'block',
                    width: '10px',
                    height: '100%',
                    top: '0%',
                    left: `${((2 * this.state.winIndex) + 1) * (100 / (2 * this.dim))}%`,
                    transform: `translateX(-50%) rotate(0deg)`,
                    transition: 'height 1s ease-in-out',
                };
            case 'diag':
                return {
                    display: 'block',
                    width: '100%',
                    height: '10px',
                    top: '50%',
                    left: '0%',
                    transform: `translateY(-50%) rotate(${this.state.winIndex ? -45 : 45}deg)`,
                    transition: 'height 1s ease-in-out',
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

                        <div className="win-line" style={this.getWinLineStyle()}></div>
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