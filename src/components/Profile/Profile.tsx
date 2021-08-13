import React from 'react';
// import classes from './ProfileInfo.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo';
import { PostType } from '../../redux/state';

type PropsType = {
  posts: Array<PostType>;
};

const Profile: React.FC<PropsType> = (props) => {
  const { posts } = props;
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={posts} />
    </div>
  );
};

export default Profile;
