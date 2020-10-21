import React from 'react';
import Login from './Login.js';
import './App.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    render() {
        const winner = calculateWinner(this.state.squares)
        let status;
        if (winner) {
            status = 'Winner is ' + winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        const squares = this.state.squares.slice()
        const xIsNext = this.state.xIsNext

        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !xIsNext
        });
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    for (let line = 0; line < lines.length; line++) {
        let [a, b, c] = lines[line];
        if (squares[a] !== null && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);

        this.state = {
            logged: false,
            xName: "",
            oName: ""
        };
    }

    render() {
        if (!this.state.logged) {
            return (
                <Login
                    xName={this.state.xName}
                    oName={this.state.oName}
                    onLogin={this.onLogin}
                />
            );
        } else {
            return (<Board/>);
        }
    }

    onLogin(xName, oName) {
        this.setState({
            logged: true,
            xName: xName,
            oName: oName
        });
    }
}

export default Game;
