import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUserData } from '../../redux/actions/AuthActions';
import { RootStateType } from '../../types/types';
import Header from './Header';

type PropsType = {};

const HeaderContainer: React.FC = (props: PropsType) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStateType) => state);
  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);
  return <Header {...auth} />;
};

export default HeaderContainer;
