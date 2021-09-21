import React, { useEffect } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect, Provider, useDispatch } from 'react-redux';
import store from './redux/store';

import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import ProfileContainer from './components/Profile/ProfileContainer';
import { compose } from 'redux';
import { initializeApp } from './redux/actions/AppActions';
import Preloader from './components/common/Preloader/Preloader';
import SitebarContainer from './components/Sitebar/SitebarContainer';
import { AppStateType } from './redux/reducers/rootReducer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

type PropsType = {
  initialized: boolean;
};

const ContainerApp: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!props.initialized) {
    return <Preloader />;
  }
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <SitebarContainer />
          <div className='app-wrapper-content'>
            <Route path='/' exact render={() => <ProfileContainer />} />
            <Route path='/profile' render={() => <ProfileContainer />} />
            <React.Suspense fallback={<Preloader />}>
              <Route path='/dialogs' render={() => <DialogsContainer />} />
            </React.Suspense>
            <React.Suspense fallback={<Preloader />}>
              <Route path='/users' render={() => <UsersContainer />} />{' '}
            </React.Suspense>

            <Route path='/login' render={() => <Login />} />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: AppStateType) => ({
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
