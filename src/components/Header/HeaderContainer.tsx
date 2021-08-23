import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/actions/AuthActions';
import { RootStateType, UserProfileType } from '../../types/types';
import Header from './Header';

type PropsType = {};
type ResponseType = {
  resultCode: number;
  messages: Array<string>;
  data: { email: string; id: number; login: string };
};

const HeaderContainer: React.FC = (props: PropsType) => {
  const dispath = useDispatch();
  const { auth } = useSelector((state: RootStateType) => state);
  useEffect(() => {
    axios
      .get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        const { email, id, login } = response.data.data;
        if (response.data.resultCode === 0) {
          dispath(setUserData(id, email, login));
        }
      });
  }, []);
  return <Header {...auth} />;
};

export default HeaderContainer;
