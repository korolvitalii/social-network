import { PhotosType, ProfileType } from '../types/types';
import { instance, ResponseType } from './api';

type UpdateUserPhotoData = {
  photos: PhotosType;
};

export const profileApi = {
  async getUserProfile(userId: number) {
    const res = await instance.get<ProfileType>(`/profile/${userId}`);
    return res.data;
  },
  async getUserStatus(userId: number) {
    const res = await instance.get<string>(`/profile/status/${userId}`);
    return res.data;
  },
  async updateUserStatus(status: string) {
    const res = await instance.put(`/profile/status`, { status: status });
    return res.data;
  },
  async updateUserPhoto(photo: File) {
    const formData = new FormData();
    formData.append('image', photo);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const res = await instance.put<ResponseType<UpdateUserPhotoData>>(
      `/profile/photo`,
      formData,
      config,
    );
    return res.data;
  },
  async updateProfile(profile: ProfileType) {
    const res = await instance.put(`/profile`, profile);
    return res.data;
  },
};
