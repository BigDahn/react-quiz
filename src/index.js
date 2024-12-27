import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ReactProvider } from './contexts/ReactContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReactProvider>
    <App />
  </ReactProvider>
)

