import { ActionsType, ADD_NEW_POST, PostType, UPDATE_TEXT_NEW_POST } from '../../types/types';

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likeCount: 12 },
    { id: 1, message: "It's my post!", likeCount: 10 },
    { id: 1, message: 'Some news', likeCount: 1 },
    { id: 1, message: 'SomePost', likeCount: 5 },
  ] as Array<PostType>,
  newPostText: '' as string,
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
    default:
      return state;
  }
};
