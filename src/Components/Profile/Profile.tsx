import React from 'react';
//@ts-ignore
import MyPostsContainer from './MyPosts/MyPostsContainer.tsx';
//@ts-ignore
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx';
//@ts-ignore
import { ProfileType } from '../../types/types.ts';

export type PropsType = {
  saveProfile: (profile: ProfileType) => void
  isOwner: boolean | null
  savePhoto: (file: File)=> void
  profile: ProfileType | null
  status: string | null
  updateStatus: (status: string)=>void
}

const Profile:React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
      saveProfile={props.saveProfile}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;