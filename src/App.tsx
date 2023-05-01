import { connect } from 'react-redux';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import DialogsContainer from './Components/Dialogs/DialogsContainer'
//@ts-ignore
import HeaderContainer from './Components/Header/HeaderContainer.tsx';
//@ts-ignore
import {LoginPage} from './Components/Login/Login.tsx';
//@ts-ignore
import NavBar from './Components/NavBar/NavBar.tsx';
// import ProfileContainer from './Components/Profile/ProfileContainer';
//@ts-ignore
import { initializeApp } from './redux/app-reducer.ts';
//@ts-ignore
import Preloader from './Components/common/Preloader/Preloader.tsx';
//@ts-ignore
import store, { AppStateType } from './redux/redux-store.ts';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//@ts-ignore
import { UsersPage } from './Components/Users/UsersContainer.tsx';
//@ts-ignore
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer.tsx'));
//@ts-ignore
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer.tsx'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: ()=>void
}

class App extends React.Component<MapPropsType&DispatchPropsType> {

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
              <Route path="/users" element={<UsersPage pageTitle={'Samurai'} />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = connect(mapStateToProps, { initializeApp })(App)


const SamuraiJsApp: React.FC = () => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default SamuraiJsApp;