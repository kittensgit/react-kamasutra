import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dialogs from './Components/Dialogs/Dialogs';
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Components/Profile/Profile';

function App(props) {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <NavBar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/profile' element={<Profile posts={props.posts} />} /> 
            <Route path="/dialogs/*" element={<Dialogs dialogs={props.dialogs} messages={props.messages}/>} />
            <Route path="/news" element={<Dialogs />} />
            <Route path="/music" element={<Dialogs />} />
            <Route path="/settings" element={<Dialogs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;