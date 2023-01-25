import { Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Components/Profile/Profile';

function App(props) {
  return (
    <div className='app-wrapper'>
      <Header />
      <NavBar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/news" element={<DialogsContainer />} />
          <Route path="/music" element={<DialogsContainer />} />
          <Route path="/settings" element={<DialogsContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;