import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import backgroundImage from './assets/background.gif';

// Create a style tag and append it to the head
const style = document.createElement('style');
style.innerHTML = `
  body {
    max-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
    background: url(${backgroundImage});
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
