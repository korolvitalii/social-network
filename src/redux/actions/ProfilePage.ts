import {
  PostType,
  ADD_NEW_POST,
  UPDATE_TEXT_NEW_POST,
  AddNewPostType,
  UpdateNewPostTextType,
} from '../../types/types';

export const addNewPost = (newPost: PostType): AddNewPostType => ({
  type: ADD_NEW_POST,
  payload: {
    newPost: newPost,
  },
});

export const updateNewPostText = (text: string): UpdateNewPostTextType => ({
  type: UPDATE_TEXT_NEW_POST,
  payload: {
    newPostText: text,
  },
});
