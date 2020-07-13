import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import 'index.scss';
import App from 'app/App';
import store from 'store/store';
import stateLocalStorage from 'localStorage/localStorage';

stateLocalStorage.load();
stateLocalStorage.watch();

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
