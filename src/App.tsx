import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';
import Profile from './components/Profile/Profile';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Sitebar from './components/Sitebar/Sitebar';
import Users from './components/Users/Users';
import Login from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <Sitebar />
          <div className='app-wrapper-content'>
            <Route path='/profile' render={() => <Profile />} />
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/login' render={() => <Login />} />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

// asd
export default App;
