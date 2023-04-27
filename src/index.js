import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import SamuraiJsApp from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <SamuraiJsApp />
    </React.StrictMode >
);

reportWebVitals();
