import './App.css';
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div className='app-wrapper'>
      <Header />
      <NavBar />
      <Profile />
    </div>
  );
}

export default App;