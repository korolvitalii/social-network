import React, { useEffect } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';

import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Sitebar from './components/Sitebar/Sitebar';
import Login from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import { compose } from 'redux';
import { RootStateType } from './types/types';
import { initializeApp } from './redux/actions/AppActions';
import Preloader from './components/common/Preloader/Preloader';

type PropsType = {
  initialized: boolean;
};

const ContainerApp: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!props.initialized) {
    return <Preloader />;
  }
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <Sitebar />
          <div className='app-wrapper-content'>
            <Route path='/profile' render={() => <ProfileContainer />} />
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/login' render={() => <Login />} />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }),
)(ContainerApp);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
