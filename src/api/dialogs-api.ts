import { instance } from './api';

export const dialogsApi = {
  getAllDialogs() {
    return instance.get(`/dialogs`).then((res) => res.data);
  },
  startChatting(userId: number) {
    debugger;
    return instance.put(`/dialogs/${userId}`).then((res) => res.data);
  },
  getListOfMessage(userId: number, page: number, count: number) {
    return instance.get(`dialogs/${userId}/messages`).then((res) => res.data);
  },
  sendMessage(userId: number, message: any) {
    return instance.post(`dialogs/${userId}/messages`, message).then((res) => res.data);
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
