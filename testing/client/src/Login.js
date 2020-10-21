import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            xName: props.xName,
            oName: props.oName,
        };

        this.xPlayerNameHandler = this.xPlayerNameHandler.bind(this);
        this.oPlayerNameHandler = this.oPlayerNameHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.submitHandler}>
                    <label>
                        X player name:
                        <input
                            type="text"
                            value={this.state.xName}
                            onChange={this.xPlayerNameHandler}
                        />
                    </label><br/>
                    <label>
                        O player name:
                        <input
                            type="text"
                            value={this.state.oName}
                            onChange={this.oPlayerNameHandler}
                        />
                    </label><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

    xPlayerNameHandler(event) {
        this.setState({xName: event.target.value});
    }

    oPlayerNameHandler(event) {
        this.setState({oName: event.target.value});
    }

    submitHandler(event) {
        this.props.onLogin(this.state.xName, this.state.oName)
        event.preventDefault();
    }
}

export default Login;
