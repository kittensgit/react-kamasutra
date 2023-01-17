import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
// import s from "./Profile.module.css"

function Profile(props) {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
      posts={props.profilePage.posts} 
      dispatch={props.dispatch}
      newPostText={props.profilePage.newPostText}
      />
    </div>
  )
}

export default Profile;