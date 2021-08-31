import axios from 'axios';
import { ServerData, UserProfileType } from '../types/types';

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

export const apiProfile = {
  getUserProfile(match: any): any {
    return instance.get<UserProfileType>(
      `/profile/${match?.params.id ? match.params.id : '19229'}`,
    );
  },
  getUserStatus(match: any) {
    return instance.get(`/profile/status/${match?.params.id ? match.params.id : '19229'}`);
  },
  updateUserStatus(status: any) {
    return instance.put(`/profile/status`, status);
  },
};

export const authApi = {
  authMe() {
    return instance.get(`/auth/me`);
  },
};
