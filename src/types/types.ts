export type PostType = {
  id: number;
  text: string;
  likeCount: number;
};

export type MessageType = {
  id: string;
  text: string;
};

export type DialogType = {
  id: number;
  name: string;
};

export type ServerData = {
  items: Array<ProfileType>;
  totalCount: number;
  error: null | string;
};

export type RootStateType = {
  profilePage: {
    posts: Array<PostType>;
    newPostText: string;
    friends: Array<string>;
    currentUser: UserType;
    status: string;
    photo: string;
  };
  messagesPage: {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
    newMessageText: string;
  };
  usersPage: {
    users: Array<ProfileType>;
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
    authErrors: Array<string>;
  };
  app: {
    initialized: boolean;
  };
};

export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string;
};

export type UserType = {
  id: number;
  name: string;
  followed: boolean;
  status: string | null;
  photos: PhotosType;
};
