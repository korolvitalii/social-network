import axios from 'axios';
import { ServerData, ProfileType } from '../types/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': '42f72717-87b3-446e-bd0e-515cb70a963e' },
});

export const apiUsers = {
  getUsers(currentPage = 1, pageSize = 10): Promise<ServerData> {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
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
    debugger;
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

export const authApi = {
  authMe() {
    return instance.get(`/auth/me`);
  },
  login(loginData: any) {
    return instance.post(`/auth/login`, loginData);
  },
  logout() {
    return instance.delete(`/auth/login`);
  },
};
