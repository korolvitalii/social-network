import { LoginDataType } from '../types/types';
import { instance, ResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum } from './api';

export type MeDataResponse = {
  id: number | null;
  email: string | null;
  login: string | null;
};

export type LoginResponseType = {
  userId: number;
};

export type authResponseType = {
  data: {};
  messages: Array<string>;
  fieldsErrors: Array<string>;
  resultCode: number;
};

export const authApi = {
  async authMe() {
    const res = await instance.get<ResponseType<MeDataResponse>>(`/auth/me`);
    return res.data;
  },
  async login(loginData: LoginDataType) {
    const res = await instance.post<
      ResponseType<LoginResponseType, ResultCodeForCaptchaEnum | ResultCodesEnum>
    >(`/auth/login`, loginData);
    return res.data;
  },
  async logout() {
    const res = await instance.delete(`/auth/login`);
    return res.data;
  },
};

export const securityApi = {
  async getCaptchaUrl() {
    const res = await instance.get('/security/get-captcha-url');
    return res.data;
  },
};
