import { PostType, ProfileType } from '../../types/types';
import { ActionsType } from '../actions/ProfileActions';

const ADD_NEW_POST = 'SN/PROFILEACTION/ADD_NEW_POST';
const SET_USER_PROFILE = 'SN/PROFILEACTION/SET_USER_PROFILE';
const SET_USER_STATUS = 'SN/PROFILEACTION/SET_USER_STATUS';
const REMOVE_POST = 'SN/PROFILEACTIONS/REMOVE_POST';
const SET_USER_PHOTO = 'SN/PROFILEACTIONS/SET_USER_PHOTO';
const SET_USER_INFO_FORM_ERRORS = 'SN/PROFILEACTIONS/SET_USER_INFO_FORM_ERRORS';
const IS_LOAD_PHOTO = 'SN/PROFILEACTIONS/IS_LOAD_PHOTO';
const TOGGLE_IS_FETCH_PROFILE = 'SN/PROFILEACTIONS/TOGGLE_IS_FETCH_PROFILE';

const initialState = {
  posts: [
    { id: 1, text: 'Hi, how are you?', likeCount: 12 },
    { id: 2, text: "It's my post!", likeCount: 10 },
    { id: 3, text: 'Some news', likeCount: 1 },
    { id: 4, text: 'SomePost', likeCount: 5 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  friends: ['John', 'Jack', 'Stasy'] as Array<string>,
  status: '' as string,
  userInfoFormErrors: [] as Array<string>,
  isLoadPhoto: true as boolean,
  isFetchProfile: true as boolean,
};

export type InitialStateType = typeof initialState;

export const ProfileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case ADD_NEW_POST: {
      const posts = [...state.posts, action.payload.newPost];
      return { ...state, posts };
    }
    case REMOVE_POST: {
      const newPosts = state.posts.filter((post) => post.id !== action.payload.id);
      return { ...state, posts: newPosts };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.payload.user };
    }
    case SET_USER_STATUS: {
      return { ...state, status: action.payload.status };
    }
    case SET_USER_PHOTO: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.payload.photos } as ProfileType,
      };
    }
    case SET_USER_INFO_FORM_ERRORS: {
      return { ...state, userInfoFormErrors: action.payload.errors };
    }
    case IS_LOAD_PHOTO: {
      return { ...state, isLoadPhoto: action.payload.isLoad };
    }
    case TOGGLE_IS_FETCH_PROFILE: {
      return { ...state, isLoadPhoto: action.payload.isFetch };
    }
    default:
      return state;
  }
};
