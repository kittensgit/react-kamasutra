import { connect } from 'react-redux';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import DialogsContainer from './Components/Dialogs/DialogsContainer'
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login.tsx';
import NavBar from './Components/NavBar/NavBar';
// import ProfileContainer from './Components/Profile/ProfileContainer';
import UsersContainer from './Components/Users/UsersContainer.tsx';
import { initializeApp } from './redux/app-reducer.ts';
import Preloader from './Components/common/Preloader/Preloader';
import store from './redux/redux-store.ts';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }


    return (

      <div className='app-wrapper'>
        <HeaderContainer />
        <NavBar />
        <div className='app-wrapper-content'>
          <React.Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/profile/*" element={<ProfileContainer />} />
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/users" element={<UsersContainer pageTitle={'Samurai'} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps, { initializeApp })(App)


const SamuraiJsApp = (props) => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default SamuraiJsApp;