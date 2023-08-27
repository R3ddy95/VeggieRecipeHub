// Definisce il tipo di azione per l'azione "SET_RECIPES"
export const SET_RECIPES = 'SET_RECIPES';

// Crea e restituisce un'azione di tipo "SET_RECIPES" con i dati delle ricette come payload
export const setRecipes = (recipes) => ({
  type: SET_RECIPES,    // Il tipo dell'azione è "SET_RECIPES"
  payload: recipes,     // I dati delle ricette sono forniti come payload dell'azione
});