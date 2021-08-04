import React from 'react';
import Post from './Post/Post';
import classes from './MyPosts.module.css';

type Props = {};

const MyPosts: React.FC = (props: Props) => {
  const postsData = [
    { id: 1, message: 'Hi, how are you?', likeCount: 12 },
    { id: 1, message: "It's my post!", likeCount: 10 },
    { id: 1, message: 'Some news', likeCount: 1 },
    { id: 1, message: 'SomePost', likeCount: 5 },
  ];

  const postsElements = postsData.map(({ id, message, likeCount }) => (
    <Post id={id} message={message} likeCount={likeCount} />
  ));
  return (
    <div className={classes.posts}>
      My posts
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div className={classes.buttonPost}>
          <button>Add Post</button>
        </div>
      </div>
      <div>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
