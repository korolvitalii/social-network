import { UserType } from '../types/types';
import { instance, ResultCodeForCaptchaEnum, ResponseType } from './api';

export type GetUsersData = {
  totalCount: number;
  error: null | string;
  items: Array<UserType>;
};

export const apiUsers = {
  getUsers(currentPage = 1, pageSize = ResultCodeForCaptchaEnum.CaptchaIsRequired) {
    return instance
      .get<GetUsersData>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  },
  follow(id: number) {
    return instance.post<ResponseType>(`/follow/${id}`).then((res) => res.data);
  },
  unfollow(id: number) {
    return instance.delete<ResponseType>(`/follow/${id}`).then((res) => res.data);
  },
};
