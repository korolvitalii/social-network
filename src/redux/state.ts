export type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  text: string;
};

export type PostType = {
  id: number;
  message: string;
  likeCount: number;
};

export type StateType = typeof state;

export type MessagesPageType = {
  messagePage: {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
  };
};

export const state = {
  profilePage: {
    posts: [
      { id: 1, message: 'Hi, how are you?', likeCount: 12 },
      { id: 1, message: "It's my post!", likeCount: 10 },
      { id: 1, message: 'Some news', likeCount: 1 },
      { id: 1, message: 'SomePost', likeCount: 5 },
    ],
  },
  messagesPage: {
    dialogs: [
      { id: 1, name: 'Roksi' },
      { id: 2, name: 'Max' },
      { id: 3, name: 'John' },
      { id: 4, name: 'Andrey' },
      { id: 5, name: 'Tom' },
      { id: 6, name: 'Jerry' },
      { id: 7, name: 'Ben' },
    ],
    messages: [
      { id: 1, text: 'hello' },
      { id: 2, text: 'hi' },
      { id: 3, text: 'yo' },
      { id: 4, text: 'bye' },
    ],
  },
  sitebar: {
    friends: ['Alex', 'Ben', 'Robert'],
  },
};
