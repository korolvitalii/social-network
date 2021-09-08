import { actions } from '../redux/actions/ProfileActions';
import React from 'react';
import { PostType } from '../types/types';
import { ProfileReducer } from '../redux/reducers/ProfileReducer';

const state = {
  posts: [
    { id: 1, text: 'Hi, how are you?', likeCount: 12 },
    { id: 2, text: "It's my post!", likeCount: 10 },
    { id: 3, text: 'Some news', likeCount: 1 },
    { id: 4, text: 'SomePost', likeCount: 5 },
  ],
  newPostText: '',
  currentUser: 0,
  friends: ['John', 'Jack', 'Stasy'],
  status: '',
};

it('length of posts should be incremented', () => {
  const newPost: PostType = { id: 5, text: 'newPostText', likeCount: 0 };
  const action = actions.addNewPost(newPost);
  const newState = ProfileReducer(state, action);
  expect(newState.posts.length).toBe(5);
});

it('text in new post should be correct', () => {
  const newPost: PostType = { id: 5, text: 'newPostText', likeCount: 0 };
  const action = actions.addNewPost(newPost);
  const newState = ProfileReducer(state, action);
  expect(newState.posts[4].text).toBe('newPostText');
});

it('after deleting length of messages should be corrected', () => {
  const action = actions.removePost(5);
  const newState = ProfileReducer(state, action);
  expect(newState.posts.length).toBe(4);
});
