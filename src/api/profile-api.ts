import { PhotosType, ProfileType, UserType } from '../types/types';
import { instance, ResponseType } from './api';

type UpdateUserStatusData = {};
type UpdateUserPhotoData = {
  photos: PhotosType;
};
type UpdateProfileData = {};
export const profileApi = {
  getUserProfile(userId: number) {
    return instance.get<ResponseType<UserType>>(`/profile/${userId}`);
  },
  getUserStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`);
  },
  updateUserStatus(status: string) {
    return instance
      .put<ResponseType<UpdateUserStatusData>>(`/profile/status`, { status: status })
      .then((response) => response.data);
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
    return instance.put<UpdateProfileData>(`/profile`, profile);
  },
};
