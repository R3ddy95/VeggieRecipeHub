import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Configura il negozio Redux utilizzando il rootReducer come riduttore principale
const store = configureStore({
  reducer: rootReducer
});

export default store;