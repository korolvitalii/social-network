import axios from 'axios';
import { ProfileType, LoginDataType, UserType, PhotosType } from '../types/types';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': '42f72717-87b3-446e-bd0e-515cb70a963e' },
});

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  message: Array<string>;
  resultCode: RC;
};

enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}
