import React from 'react';
import classes from './MyPosts.module.css';

import { PostType } from '../../../types/types';
import Post from './Post/Post';
import MyPostsForm from './MyPostsForm';

type PropsType = {
  posts: Array<PostType>;
};

const MyPosts: React.FC<PropsType> = ({ posts }) => {
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
