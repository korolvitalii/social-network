export const ADD_NEW_POST = 'ADD_NEW_POST';
export const UPDATE_TEXT_NEW_POST = 'UPDATE_TEXT_NEW_POST';
export const UPDATE_TEXT_NEW_MESSAGE = 'UPDATE_TEXT_NEW_MESSAGE';

export type PostType = {
  id: number;
  message: string;
  likeCount: number;
};

export type MessageType = {
  id: number;
  text: string;
};

export type DialogType = {
  id: number;
  name: string;
};

export type AddNewPostType = {
  type: typeof ADD_NEW_POST;
  payload: {
    newPost: PostType;
  };
};

export type UpdateNewPostTextType = {
  type: typeof UPDATE_TEXT_NEW_POST;
  payload: {
    newPostText: string;
  };
};

export type UpdateNewMessageTextType = {
  type: typeof UPDATE_TEXT_NEW_MESSAGE;
  payload: {
    newMessageText: string;
  };
};

export type ActionsType = AddNewPostType | UpdateNewPostTextType | UpdateNewMessageTextType;

export type RootStateType = {
  profilePage: {
    posts: Array<PostType>;
    newPostText: string;
  };
  messagesPage: {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
  };
  sitebar: {
    friends: Array<string>;
  };
};
