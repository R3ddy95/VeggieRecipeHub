import { combineReducers } from 'redux';
import { SET_RECIPES } from './actions';

const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_RECIPES:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  recipes: recipesReducer,
});

export default rootReducer;
