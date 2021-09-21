import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUserData } from '../../redux/actions/AuthActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import Header from './Header';

const HeaderContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: AppStateType) => state);

  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);
  return <Header {...auth} />;
};

export default HeaderContainer;
