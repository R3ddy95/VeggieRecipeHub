import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import RecipeDetail from './components/Recipes/RecipeDetail';

function App() {
  return (
    <Router>
      <Switch>
        {/* La Route per la pagina principale (Home) */}
        <Route path="/" exact component={Home} />

        {/* La Route per la visualizzazione dei dettagli delle ricette */}
        <Route path="/recipe/:id" component={RecipeDetail} />
      </Switch>
    </Router>
  );
}

export default App;