import { UserType } from '../types/types';
import { instance, ReponseType } from './api';

type MeDataResponse = {
  items: Array<UserType>;
  totalCount: number;
  error: null | string;
};

type LoginDataType = {
  userId: number;
};

type LogoutDataType = {};

export const authApi = {
  authMe() {
    return instance.get<ReponseType<MeDataResponse>>(`/auth/me`);
  },
  login(loginData: LoginDataType) {
    return instance.post<LoginDataType>(`/auth/login`, loginData);
  },
  logout() {
    return instance.delete<LogoutDataType>(`/auth/login`);
  },
};

export const securityApi = {
  getCaptchaUrl() {
    return instance.get('/security/get-captcha-url');
  },
};
