// src/index.js (Frontend - React)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // If you have custom styles
import App from './App';  // This is your main App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
