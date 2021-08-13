import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import { StateType } from './redux/state';
import Sitebar from './components/Sitebar/Sitebar';

type PropsType = {
  state: StateType;
};

const App: React.FC<PropsType> = (props) => {
  const { state } = props;
  const {
    messagesPage: { dialogs, messages },
  }: any = state;
  const {
    profilePage: { posts },
  }: any = state;
  const { sitebar } = state;
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app-wrapper'>
          <Header />
          <Navbar />
          <Sitebar sitebar={sitebar} />
          <div className='app-wrapper-content'>
            <Route path='/profile' render={() => <Profile posts={posts} />} />
            <Route
              path='/dialogs'
              render={() => <Dialogs dialogs={dialogs} message={messages} />}
            />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
