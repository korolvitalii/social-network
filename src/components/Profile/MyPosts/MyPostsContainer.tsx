import React from 'react';
import { connect } from 'react-redux';

import MyPosts from './MyPosts';
import { AppStateType } from '../../../redux/reducers/rootReducer';
import { getPosts } from '../../../redux/selectors/profile-selectors';

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: getPosts(state),
  };
};

const MyPostContainer = connect(mapStateToProps, {})(MyPosts);

export default MyPostContainer;
