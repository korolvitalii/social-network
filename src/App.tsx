import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import { DialogType, MessageType, PostType } from './AppLoader';

type PropsType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
  posts: Array<PostType>;
};

const App: React.FC<PropsType> = (props) => {
  const { dialogs, messages, posts } = props;
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
