import React, { Props } from 'react';
import Post from './Post/Post';
import classes from './MyPosts.module.css';
import { PostType } from '../../../AppLoader';

type PropsType = {
  posts: Array<PostType>;
};

const MyPosts: React.FC<PropsType> = (props) => {
  const { posts } = props;
  const postsElements = posts.map(({ id, message, likeCount }) => (
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
