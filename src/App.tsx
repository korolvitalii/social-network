import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import Sitebar from './components/Sitebar/Sitebar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app-wrapper'>
          <Header />
          <Navbar />
          <Sitebar />
          <div className='app-wrapper-content'>
            <Route path='/profile' render={() => <Profile />} />
            <Route path='/dialogs' render={() => <Dialogs />} />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
