import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
// import s from "./Profile.module.css"

function Profile(props) {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer store={props.store}/>
    </div>
  )
}

export default Profile;