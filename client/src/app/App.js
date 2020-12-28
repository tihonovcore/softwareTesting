import Board from "./Board";
import Login from './Login.js';
import React from 'react';

import './App.css';

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
            oScore: null,

            service: props.service
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

                    service={this.state.service}
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

                    service={this.state.service}
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
