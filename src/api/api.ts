import axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': 'e17d4f1f-f379-4efd-80e1-41f3eb605af5' },
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
  fieldsErrors?: string[];
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}
