import { connect } from 'react-redux';
import React from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/reset.css';
// import DialogsContainer from './Components/Dialogs/DialogsContainer'
//@ts-ignore
import HeaderContainer from './Components/Header/HeaderContainer.tsx';
//@ts-ignore
import { LoginPage } from './Components/Login/Login.tsx';
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

import { UserOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items1: MenuItem[] = [
  getItem('My Profile', 'profile', <UserOutlined />, [
    getItem(<Link to="/profile" >Profile</Link>, '1'),
    getItem(<Link to='/dialogs' >Messages</Link>, '2'),
  ]),
  getItem('Developers', 'users', <TeamOutlined />, [
    getItem(<Link to='/developers'>Developers</Link>, '3')
  ]),
];


const items2: MenuItem[] = [
  getItem('Dev', 'dev', <UserOutlined />, [
    getItem(<Link to='/developers'>Developers</Link>, '4')
  ])
];

//@ts-ignore
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer.tsx'));
//@ts-ignore
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer.tsx'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}


class App extends React.Component<MapPropsType & DispatchPropsType> {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }



    return (

      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items2}/>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0' }}>
            <Sider width={200}>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={items1}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <React.Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path="/profile/*" element={<ProfileContainer />} />
                  <Route path="/profile/:userId" element={<ProfileContainer />} />
                  <Route path="/dialogs/*" element={<DialogsContainer />} />
                  <Route path="/developers" element={<UsersPage pageTitle={'Samurai'} />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<div>NOT FOUND 404</div>} />
                </Routes>
              </React.Suspense>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>

      /* 
  <div className='app-wrapper'>
  //   <HeaderContainer />
  //   <NavBar />
  //   <div className='app-wrapper-content'>
  //     <React.Suspense fallback={<Preloader />}>
  //       <Routes>
  //         <Route path="/profile/*" element={<ProfileContainer />} />
  //         <Route path="/profile/:userId" element={<ProfileContainer />} />
  //         <Route path="/dialogs/*" element={<DialogsContainer />} />
  //         <Route path="/users" element={<UsersPage pageTitle={'Samurai'} />} />
  //         <Route path="/login" element={<LoginPage />} />
  //         <Route path="*" element={<div>NOT FOUND 404<Button>OK</Button></div>} />
  //       </Routes>
  //     </React.Suspense>
  //   </div>
   </div> */

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