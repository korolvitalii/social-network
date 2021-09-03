import React from 'react';
import { useSelector } from 'react-redux';
import classes from './MyPosts.module.css';

import { PostType, RootStateType } from '../../types/types';
import Post from './Post/Post';
import MyPostsForm from './MyPostsForm';

const MyPosts: React.FC = () => {
  const { posts } = useSelector((state: RootStateType) => state.profilePage);

  const postsElements = posts.map((post: PostType) => {
    const { id, text, likeCount } = post;
    return <Post key={id} id={id} message={text} likeCount={likeCount} />;
  });

  return (
    <div className={classes.posts}>
      My posts
      <div>
        <MyPostsForm />
      </div>
      <div>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
