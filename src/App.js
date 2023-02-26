import { Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import NavBar from './Components/NavBar/NavBar';
import ProfileContainer from './Components/Profile/ProfileContainer';
import UsersContainer from './Components/Users/UsersContainer';

function App(props) {
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <NavBar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path="/profile/*" element={<ProfileContainer />} />
          <Route path="/profile/:userId" element={<ProfileContainer />} />
          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/users" element={<UsersContainer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;