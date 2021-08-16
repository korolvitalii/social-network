import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './MyPosts.module.css';

import { PostType, RootStateType } from '../../../types/types';
import Post from './Post/Post';
import { addNewPost, updateNewPostText } from '../../../redux/actions/ProfilePage';

const MyPosts: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, newPostText } = useSelector((state: RootStateType) => state.profilePage);

  const onAddPostClick = (): void => {
    const newPost = { id: 1, message: newPostText, likeCount: 0 };
    dispatch(addNewPost(newPost));
    dispatch(updateNewPostText(''));
  };

  const onNewPostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const text = e.target.value;
    dispatch(updateNewPostText(text));
  };

  const postsElements = posts.map((post: PostType) => {
    const { id, message, likeCount } = post;
    return <Post key={`${id}__${likeCount}`} id={id} message={message} likeCount={likeCount} />;
  });

  return (
    <div className={classes.posts}>
      My posts
      <div>
        <div>
          <textarea value={newPostText} onChange={onNewPostTextChange}></textarea>
        </div>
        <div className={classes.buttonPost}>
          <button onClick={onAddPostClick}>Add Post</button>
        </div>
      </div>
      <div>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
