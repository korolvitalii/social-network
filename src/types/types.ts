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

export type AddNewMessageType = {
  type: typeof ADD_NEW_MESSAGE;
  payload: {
    newMessage: MessageType;
  };
};

export type UpdateNewMessageTextType = {
  type: typeof UPDATE_TEXT_NEW_MESSAGE;
  payload: {
    newMessageText: string;
  };
};

export type ToggleFollowUnfollowType = {
  type: typeof CHANGE_FLAG;
  payload: {
    userId: number;
  };
};

export type SetUsersType = {
  type: typeof SET_USERS;
  payload: {
    items: Array<UserType>;
  };
};

export type GetTotalCountType = {
  type: typeof GET_TOTAL_COUNT;
  payload: {
    totalCount: number;
  };
};

export type SetPagesCountType = {
  type: typeof SET_PAGES_COUNT;
  payload: {
    totalCount: number;
    pageSize: number;
  };
};

export type ToggleIsFetchData = {
  type: typeof TOGGLE_IS_FETCH_DATA;
  payload: {
    isFetch: boolean;
  };
};

export type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  payload: {
    user: UserProfileType;
  };
};

export type SetUserDataType = {
  type: typeof SET_USER_DATA;
  payload: {
    userData: {
      id: number;
      email: string;
      login: string;
    };
  };
};

export type ActionsType =
  | AddNewPostType
  | UpdateNewPostTextType
  | AddNewMessageType
  | UpdateNewMessageTextType
  | ToggleFollowUnfollowType
  | SetUsersType
  | GetTotalCountType
  | SetPagesCountType
  | ToggleIsFetchData
  | SetUserProfileType
  | SetUserDataType;

export type RootStateType = {
  profilePage: {
    posts: Array<PostType>;
    newPostText: string;
    friends: Array<string>;
    currentUser: UserProfileType;
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
    isFetched: boolean;
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
