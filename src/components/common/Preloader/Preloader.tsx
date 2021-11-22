import React from 'react';
import loading from '../../../assets/images/loading-buffering.gif';

const Preloader: React.FC = (): React.ReactElement => {
  return (
    <div>
      <img src={loading} alt='Loading...' />
    </div>
  );
};

export default Preloader;
