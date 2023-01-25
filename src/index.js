import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import store from './Components/redux/redux-store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import StoreContext from './StoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

export let rerenderEntireTree = (state) => { // чтобы не импортировать мы передаем через параметры
    root.render(
        <React.StrictMode>
            <BrowserRouter>
            <StoreContext.Provider value={store}>
                <App />
            </StoreContext.Provider>
            </BrowserRouter>
        </React.StrictMode>
    );
}


rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state);
});

reportWebVitals();
