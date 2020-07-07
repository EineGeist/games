import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import 'index.scss';
import App from 'app/App';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('app')
);
