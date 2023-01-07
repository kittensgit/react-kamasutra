import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import state from './Components/redux/state';
import { BrowserRouter } from 'react-router-dom';
import { addPost } from './Components/redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App state={state} addPost={addPost} />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
