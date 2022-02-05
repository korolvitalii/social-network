import { PhotosType } from '../types/types';
import { instance } from './api';

export type DialogType = {
  hasNewMessages: boolean;
  id: number;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: PhotosType;
  userName: string;
};

export type DialogMessageType = {
  id: string;
  body: string;
  translatedBody: null;
  addedAt: string;
  senderId: number;
  senderName: string;
  recipientId: number;
  viewed: boolean;
};

export type ListOfMessagesType = {
  error: null;
  items: DialogMessageType[];
  totalCount: number;
};

export type SendMessageType = {
  data: {
    message: {
      id: string;
      body: string;
      translatedBody: null;
      addedAt: string;
      senderId: number;
      senderName: string;
      recipientId: number;
      recipientName: string;
      viewed: boolean;
      deletedBySender: boolean;
      deletedByRecipient: boolean;
      isSpam: boolean;
      distributionId: null;
    };
  };
  messages: [];
  fieldsErrors: [];
  resultCode: 0;
};

export const dialogsApi = {
  async getAllDialogs() {
    const res = await instance.get<DialogType[]>(`/dialogs`);
    return res.data;
  },
  async startChatting(userId: number) {
    const res = await instance.put(`/dialogs/${userId}`);
    return res.data;
  },
  async getListOfMessage(userId: number, page: number, count: number) {
    const res = await instance.get<ListOfMessagesType>(`dialogs/${userId}/messages`);
    return res.data;
  },
  async sendMessage(userId: number, message: { body: string }) {
    const res = await instance.post<SendMessageType>(`dialogs/${userId}/messages`, message);
    return res.data;
  },
  async isMessageViewed(messageId: number) {
    const res = await instance.get(`dialogs/messages/${messageId}/viewed`);
    return res.data;
  },
  async transferMessageToSpam(messageId: number) {
    const res = await instance.post(`dialogs/messages/${messageId}/spam`);
    return res.data;
  },
  async deleteMessage(messageId: number) {
    const res = await instance.delete(`dialogs/messages/${messageId}`);
    return res.data;
  },
  restoreMessageFromDeletedAndSpam(messageId: number) {
    instance.put(`dialogs/messages/${messageId}/restore`).then((res) => res.data);
  },
  async returnMessagesNewestThanDate(userId: number, date: number) {
    const res = await instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`);
    return res.data;
  },
};
