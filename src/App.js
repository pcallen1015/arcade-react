import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/home.page';
import GamePage from './pages/game.page';

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage}></Route>
      <Route exact path="/games/:gameID" component={GamePage}></Route>
    </Router>
    
  );
}

export default App;
