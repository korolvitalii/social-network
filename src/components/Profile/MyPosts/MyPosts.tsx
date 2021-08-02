import React from 'react';
import Post from './Post/Post';
import classes from './MyPosts.module.css';

type Props = {};

const MyPosts: React.FC = (props: Props) => {
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button>Add Post</button>
      </div>
      <div>
        <Post message='Hello' />
        <Post message='Hello John' />
        <Post message='Hello Good Bye' />
      </div>
    </div>
  );
};

export default MyPosts;
