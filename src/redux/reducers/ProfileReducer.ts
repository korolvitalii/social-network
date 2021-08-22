import { ActionsType, PostType, UserType } from '../../types/types';

const ADD_NEW_POST = 'ADD_NEW_POST';
const UPDATE_TEXT_NEW_POST = 'UPDATE_TEXT_NEW_POST';
const SET_USER_PROFILE = ' SET_USER_PROFILE';

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likeCount: 12 },
    { id: 1, message: "It's my post!", likeCount: 10 },
    { id: 1, message: 'Some news', likeCount: 1 },
    { id: 1, message: 'SomePost', likeCount: 5 },
  ] as Array<PostType>,
  newPostText: '' as string,
  currentUser: null as null | UserType,
  friends: ['John', 'Jack', 'Stasy'] as Array<string>,
};

export const posts = (state = initialState, action: ActionsType): typeof initialState => {
  switch (action.type) {
    case ADD_NEW_POST: {
      // debugger;
      const posts = [...state.posts, action.payload.newPost];
      return { ...state, posts };
    }
    case UPDATE_TEXT_NEW_POST: {
      return { ...state, ...action.payload };
    }
    case SET_USER_PROFILE: {
      return { ...state, currentUser: action.payload.user };
    }

    default:
      return state;
  }
};
