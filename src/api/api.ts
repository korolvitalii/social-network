import axios from 'axios';
import { ServerData, ProfileType, LoginDataType } from '../types/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': '42f72717-87b3-446e-bd0e-515cb70a963e' },
});

export const apiUsers = {
  getUsers(currentPage = 1, pageSize = 10): Promise<ServerData | undefined> {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`);
  },
  follow(id: number): any {
    return instance.post<ServerData>(`/follow/${id}`);
  },
  unfollow(id: number): any {
    return instance.delete<ServerData>(`/follow/${id}`);
  },
};

export const profileApi = {
  getUserProfile(userId: number): any {
    return instance.get<ProfileType>(`/profile/${userId}`);
  },
  getUserStatus(userId: number) {
    return instance.get(`/profile/status/${userId}`);
  },
  updateUserStatus(status: any) {
    return instance.put(`/profile/status`, { status: status }).then((response) => response.data);
  },
  updateUserPhoto(photo: any) {
    const formData = new FormData();
    formData.append('image', photo);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return instance.put(`/profile/photo`, formData, config);
  },
  updateProfile(profile: ProfileType) {
    return instance.put(`/profile`, profile);
  },
};

type AuthMeType = {
  resultCode: number;
  messages: Array<string>;
  data: {
    id: number;
    email: string;
    login: string;
  };
};

type LoginType = {
  resultCode: number;
  messages: Array<string>;
  data: {
    userId: number;
  };
};

type LogoutType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};

export const authApi = {
  authMe() {
    return instance.get<AuthMeType>(`/auth/me`);
  },
  login(loginData: LoginDataType) {
    return instance.post<LoginType>(`/auth/login`, loginData);
  },
  logout() {
    return instance.delete<LogoutType>(`/auth/login`);
  },
};

export const securityApi = {
  getCaptchaUrl() {
    return instance.get('/security/get-captcha-url');
  },
};
