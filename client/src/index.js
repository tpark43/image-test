import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { ImageProvider } from './context/ImageContext';

ReactDOM.render(
  <Router>
    <ImageProvider>
      <App />  
    </ImageProvider>
  </Router>,
  document.getElementById('root')
);