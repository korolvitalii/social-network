import React from 'react';
import './App.css';
import Profile from './components/Profile';
import Header from './components/Header';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <Profile />
    </div>
  );
};

export default App;
