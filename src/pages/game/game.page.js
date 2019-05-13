import React from 'react';

export default class GamePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameID: props.match.params.gameID
        }

        console.log(this.state);
    }

    render() {
        return <div>{this.state.gameID}</div>;
    }
}