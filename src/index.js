import './index.css';
import reportWebVitals from './reportWebVitals';
import { rerenderEntireTree } from './render';
import state from './Components/redux/state';

rerenderEntireTree(state);

reportWebVitals();
