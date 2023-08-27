import { combineReducers } from 'redux';
import { SET_RECIPES } from './actions';

// Definisce il reducer per lo stato delle ricette
const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_RECIPES:
      // Quando l'azione SET_RECIPES viene emessa, aggiorna lo stato con il payload (array di ricette)
      return action.payload;
    default:
      // Se l'azione non corrisponde a nessun caso, ritorna lo stato attuale senza modifiche
      return state;
  }
};

// Combina tutti i reducer in un unico rootReducer
const rootReducer = combineReducers({
  recipes: recipesReducer, // Assegna il reducer delle ricette allo stato "recipes"
});

export default rootReducer;