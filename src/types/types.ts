export type PostType = {
  id: number;
  text: string;
  likeCount: number;
};

export type MessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
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

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
