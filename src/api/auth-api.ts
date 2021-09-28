import { LoginDataType } from '../types/types';
import { instance, ResponseType } from './api';

type MeDataResponse = {
  id: number;
  email: string;
  login: string;
};

export const authApi = {
  authMe() {
    return instance.get<ResponseType<MeDataResponse>>(`/auth/me`);
  },
  login(loginData: LoginDataType) {
    return instance.post(`/auth/login`, loginData);
  },
  logout() {
    return instance.delete(`/auth/login`);
  },
};

export const securityApi = {
  getCaptchaUrl() {
    return instance.get('/security/get-captcha-url');
  },
};
