const GAMES = [
    {
        id: 'tic-tac-toe',
        name: 'Tic-Tac-Toe',
    }, {
        id: 'rock-paper-scissors',
        name: 'Rock-Paper-Scissors'
    }
];

export default class GamesService {

    static games() { return GAMES; }

    getGame(id) {
        return GAMES.find(game => game.id === id);
    }

    reportWin(game, winner) {
        
    }
}