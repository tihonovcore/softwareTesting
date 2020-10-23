import React from 'react';
import Square from "./Square";

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

            service: props.service
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
            const newXScore = this.state.xScore + (winner.toString() === 'X' ? 1 : 0)
            const newOScore = this.state.oScore + (winner.toString() === 'O' ? 1 : 0)

            this.state.service.setScore(xName, newXScore)
            this.state.service.setScore(oName, newOScore)

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
                    data-testid="repeat_button"
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
                    <button data-testid="finish_button" onClick={this.state.finish}>Finish</button>
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
                testId={i.toString()}
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

export default Board;
