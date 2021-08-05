import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import { StateType, MessageType, MessagesPageType } from './redux/state';

type PropsType = {
  state: StateType;
};

const App: React.FC<PropsType> = (props) => {
  const {
    messagesPage: { dialogs, messages },
  }: any = props;
  const {
    profilePage: { posts },
  }: any = props;
  debugger;
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/profile' render={() => <Profile posts={posts} />} />
          <Route path='/dialogs' render={() => <Dialogs dialogs={dialogs} message={messages} />} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
