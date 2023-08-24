import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot da "react-dom/client"
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root')); // Usa createRoot

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();