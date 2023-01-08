import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { addPost, updateNewPostText } from './Components/redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));

export let rerenderEntireTree = (state) => { // чтобы не импортировать мы передаем через параметры
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
            </BrowserRouter>
        </React.StrictMode>
    );
}


// reportWebVitals();