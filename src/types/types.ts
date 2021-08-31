const ADD_NEW_POST = 'ADD_NEW_POST';
const UPDATE_TEXT_NEW_POST = 'UPDATE_TEXT_NEW_POST';
const UPDATE_TEXT_NEW_MESSAGE = 'UPDATE_TEXT_NEW_MESSAGE';
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
const CHANGE_FLAG = 'CHANGE_FLAG';
const SET_USERS = 'SET_USERS';
const GET_TOTAL_COUNT = 'GET_TOTAL_COUNT';
const SET_PAGES_COUNT = 'SET_PAGES_COUNT';
const TOGGLE_IS_FETCH_DATA = 'TOGGLE_IS_FETCH_DATA';
const SET_USER_PROFILE = ' SET_USER_PROFILE';
const SET_USER_DATA = 'SET_USER_DATA';

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

export type UserType = {
  name: string;
  id: number;
  uniqueUrlName: null | string;
  photos: {
    small: undefined | string;
    large: undefined | string;
  };
  status: null | string;
  followed: boolean;
};

export type ServerData = {
  items: Array<UserType>;
  totalCount: number;
  error: null | string;
};

export type RootStateType = {
  profilePage: {
    posts: Array<PostType>;
    newPostText: string;
    friends: Array<string>;
    currentUser: UserProfileType;
    status: string;
  };
  messagesPage: {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
    newMessageText: string;
  };
  usersPage: {
    users: Array<UserType>;
    totalCount: number;
    pageSize: number;
    pagesCount: number;
    isFetch: boolean;
    isFollowingProgress: boolean;
  };
  auth: {
    id: number;
    login: string;
    email: string;
    isAuth: boolean;
  };
};

export type UserProfileType = {
  aboutMe: string | null;
  contacts: {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string | null;
  userId: number;
  photos: {
    small: string;
    large: string;
  };
};
