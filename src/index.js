import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CryptoState from './context/CryptoState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <CryptoState><App /></CryptoState>
  </React.StrictMode>
);
