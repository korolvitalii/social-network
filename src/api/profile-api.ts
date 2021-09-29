import { PhotosType, ProfileType } from '../types/types';
import { instance, ResponseType } from './api';

type UpdateUserPhotoData = {
  photos: PhotosType;
};

export const profileApi = {
  getUserProfile(userId: number) {
    return instance.get<ProfileType>(`/profile/${userId}`).then((res) => res.data);
  },
  getUserStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`).then((res) => res.data);
  },
  updateUserStatus(status: string) {
    return instance.put(`/profile/status`, { status: status }).then((res) => res.data);
  },
  updateUserPhoto(photo: File) {
    const formData = new FormData();
    formData.append('image', photo);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return instance
      .put<ResponseType<UpdateUserPhotoData>>(`/profile/photo`, formData, config)
      .then((res) => res.data);
  },
  updateProfile(profile: ProfileType) {
    return instance.put(`/profile`, profile).then((res) => res.data);
  },
};
