import React from 'react';
import Login from './Login.js';
import './App.css';
import Service from "./Service";

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
            xIsNext: true,
            onWinScoreUpdated: false,

            xName: props.xName,
            oName: props.oName,
            xScore: props.xScore,
            oScore: props.oScore,

            finish: props.finish,
        };
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        const xName = this.state.xName;
        const oName = this.state.oName;

        let status;
        if (winner) {
            status = 'Winner is ' + (winner.toString() === 'X' ? xName : oName) + ' (' + winner + ')';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? xName + ' (X)' : oName + ' (O)');
        }

        if (winner && !this.state.onWinScoreUpdated) {
            const newXScore = this.state.xScore + (winner === 'X' ? 1 : 0)
            const newOScore = this.state.oScore + (winner === 'O' ? 1 : 0)

            Service.setScore(xName, newXScore)
            Service.setScore(oName, newOScore)

            this.setState({
                xScore: newXScore,
                oScore: newOScore,
                onWinScoreUpdated: !this.state.onWinScoreUpdated
            });
        }

        const score = xName + ' ' + this.state.xScore + '-' + this.state.oScore + ' ' + oName

        let repeat = null;
        if (winner) {
            repeat = (
                <button
                    onClick={() => {
                        this.setState({
                            squares: Array(9).fill(null),
                            onWinScoreUpdated: false
                        })
                    }}
                >
                    Repeat
                </button>
            );
        }

        return (
            <div>
                <div className="score">{score}</div>
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
                <div>
                    <button onClick={this.state.finish}>Finish</button>
                    {repeat}
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
        this.setXScore = this.setXScore.bind(this);
        this.setOScore = this.setOScore.bind(this);

        this.finish = this.finish.bind(this);

        this.state = {
            logged: false,
            xName: "",
            oName: "",
            xScore: null,
            oScore: null
        };
    }

    setXScore(v) {
        this.setState({
            xScore: v
        });
    }

    setOScore(v) {
        this.setState({
            oScore: v
        });
    }

    render() {
        if (!this.state.logged) {
            return (
                <Login
                    setXScore={this.setXScore}
                    setOScore={this.setOScore}
                    onLogin={this.onLogin}
                />
            );
        } else if (this.scoreNotLoaded()) {
            return (
                <div>
                    <h3>Loading</h3>
                </div>
            )
        } else {
            return (
                <Board
                    xName={this.state.xName}
                    oName={this.state.oName}
                    xScore={this.state.xScore}
                    oScore={this.state.oScore}

                    finish={this.finish}
                />
            );
        }
    }

    onLogin(xName, oName) {
        this.setState({
            logged: true,
            xName: xName,
            oName: oName,
        });
    }

    finish() {
        this.setState({
            logged: false,
            xName: "",
            oName: "",
            xScore: null,
            oScore: null
        })
    }

    scoreNotLoaded = () => this.state.xScore == null || this.state.oScore == null
}

export default Game;
