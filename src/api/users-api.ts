import { UserType } from '../types/types';
import { instance, ResultCodeForCaptchaEnum, ResponseType } from './api';

type GetUsersData = {
  totalCount: number;
  error: null | string;
  items: Array<UserType>;
};

type FollowUnfollowData = {};

export const apiUsers = {
  getUsers(currentPage = 1, pageSize = ResultCodeForCaptchaEnum.CaptchaIsRequired) {
    return instance.get<ResponseType<GetUsersData>>(`users?page=${currentPage}&count=${pageSize}`);
  },
  follow(id: number) {
    return instance.post<ResponseType<FollowUnfollowData>>(`/follow/${id}`);
  },
  unfollow(id: number) {
    return instance.delete<ResponseType<FollowUnfollowData>>(`/follow/${id}`);
  },
};
