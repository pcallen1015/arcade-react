import React from 'react';
import './home.page.scss';
import GamesService from '../services/games.service';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            games: []
        };
    }

    loadGames() {
        this.setState({ ready: true, games: GamesService.games() })
    }

    componentDidMount() {
        this.loadGames();
    }

    render() {
        return (
            <div className="page">
                <div className="header">
                    <h1>Welcome to the React Arcade!</h1>
                </div>
                <div className="body">
                    <h2>-- GAMES --</h2>
                    <div className="game-grid">
                        {this.state.games.map(game =>
                            <Link to={`/games/${game.id}`} key={game.id} className="game-tile">
                                <h4>{game.name}</h4>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}