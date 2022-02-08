import axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': '62fcc7db-5e7c-4b01-b514-584dfad4c09b' },
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
