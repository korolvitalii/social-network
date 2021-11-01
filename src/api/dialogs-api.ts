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
  getAllDialogs() {
    return instance.get<DialogType[]>(`/dialogs`).then((res) => res.data);
  },
  startChatting(userId: number) {
    return instance.put(`/dialogs/${userId}`).then((res) => res.data);
  },
  getListOfMessage(userId: number, page: number, count: number) {
    return instance.get<ListOfMessagesType>(`dialogs/${userId}/messages`).then((res) => res.data);
  },
  sendMessage(userId: number, message: any) {
    return instance
      .post<SendMessageType>(`dialogs/${userId}/messages`, message)
      .then((res) => res.data);
  },
  isMessageViewed(messageId: number) {
    return instance.get(`dialogs/messages/${messageId}/viewed`).then((res) => res.data);
  },
  transferMessageToSpam(messageId: number) {
    return instance.post(`dialogs/messages/${messageId}/spam`).then((res) => res.data);
  },
  deleteMessage(messageId: number) {
    return instance.delete(`dialogs/messages/${messageId}`).then((res) => res.data);
  },
  restoreMessageFromDeletedAndSpam(messageId: number) {
    instance.put(`dialogs/messages/${messageId}/restore`).then((res) => res.data);
  },
  returnMessagesNewestThanDate(userId: number, date: number) {
    return instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`).then((res) => res.data);
  },
};
