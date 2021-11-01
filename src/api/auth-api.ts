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
  authMe() {
    return instance.get<ResponseType<MeDataResponse>>(`/auth/me`).then((res) => res.data);
  },
  login(loginData: LoginDataType) {
    return instance
      .post<ResponseType<LoginResponseType, ResultCodeForCaptchaEnum | ResultCodesEnum>>(
        `/auth/login`,
        loginData,
      )
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`/auth/login`).then((res) => res.data);
  },
};

export const securityApi = {
  getCaptchaUrl() {
    return instance.get('/security/get-captcha-url').then((res) => res.data);
  },
};
