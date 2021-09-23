import { PhotosType, ProfileType, UserType } from '../types/types';
import { instance, ResponseType } from './api';

type UpdateUserPhotoData = {
  photos: PhotosType;
};

export const profileApi = {
  getUserProfile(userId: number) {
    return instance.get<ProfileType>(`/profile/${userId}`);
  },
  getUserStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`);
  },
  updateUserStatus(status: string) {
    return instance.put(`/profile/status`, { status: status }).then((response) => response.data);
  },
  updateUserPhoto(photo: File) {
    const formData = new FormData();
    formData.append('image', photo);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return instance.put<ResponseType<UpdateUserPhotoData>>(`/profile/photo`, formData, config);
  },
  updateProfile(profile: ProfileType) {
    return instance.put(`/profile`, profile);
  },
};
