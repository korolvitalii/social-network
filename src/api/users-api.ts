import { UserType } from '../types/types';
import { instance, ResultCodeForCaptchaEnum, ResponseType } from './api';

type GetUsersData = {
  totalCount: number;
  error: null | string;
  items: Array<UserType>;
};

export const apiUsers = {
  getUsers(currentPage = 1, pageSize = ResultCodeForCaptchaEnum.CaptchaIsRequired) {
    return instance.get<GetUsersData>(`users?page=${currentPage}&count=${pageSize}`);
  },
  follow(id: number) {
    return instance.post<ResponseType>(`/follow/${id}`).then((res) => res.data);
  },
  unfollow(id: number) {
    return instance.delete<ResponseType>(`/follow/${id}`).then((res) => res.data);
  },
};
