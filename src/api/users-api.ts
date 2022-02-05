import { UserType } from '../types/types';
import { instance, ResultCodeForCaptchaEnum, ResponseType } from './api';

export type GetUsersData = {
  totalCount: number;
  error: null | string;
  items: Array<UserType>;
};

export const apiUsers = {
  async getUsers(
    currentPage = 1 as number | null | undefined,
    pageSize = ResultCodeForCaptchaEnum.CaptchaIsRequired,
    term = '',
    friend: boolean | string,
  ) {
    const res = await instance.get<GetUsersData>(
      `users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`,
    );
    return res.data;
  },
  async follow(id: number) {
    const res = await instance.post<ResponseType>(`/follow/${id}`);
    return res.data;
  },
  async unfollow(id: number) {
    const res = await instance.delete<ResponseType>(`/follow/${id}`);
    return res.data;
  },
};
