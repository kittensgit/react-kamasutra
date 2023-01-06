import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dialogs=[
  {name: 'Noah', id: 1},
  {name: 'William', id: 2},
  {name: 'Michael', id: 3},
  {name: 'Ethan', id: 4},
  {name: 'Alexander', id: 5},
  {name: 'Jacob', id: 6},
]

let messages=[
  {message: "Hi! It's my first message", id: 1},
  {message: "call me", id: 2},
  {message: "i'm eating right now", id: 3},
  {message: "cucumber", id: 4},
  {message: "potato", id: 5},
]

let posts=[
  {message: "hi, how are you?", id: 1, likesCount: 12},
  {message: "it's my first post", id: 2, likesCount: 10},
]

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App dialogs={dialogs} messages={messages} posts={posts}/>
  </React.StrictMode>
);

reportWebVitals();
