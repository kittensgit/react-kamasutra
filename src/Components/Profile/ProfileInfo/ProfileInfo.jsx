import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import s from './ProfileInfo.module.css';

function ProfileInfo({ profile, status, updateStatus, isOwner, savePhoto }) {
    if (!profile) {
        return <Preloader />
    }

    const mainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            {/* <div>
                <img src='https://img.freepik.com/free-vector/vibrant-background-with-diagonal-lines-effect-design_1017-28226.jpg?w=996&t=st=1672660654~exp=1672661254~hmac=55cbc4ce2d93ba8fc3ff82adbe3fdde319ab7760d89dca9bcd138f0f06b2fa83' alt='img'/>
            </div> */}
            <img src={profile.photos.large || userPhoto} alt='ava' className={s.mainPhoto} />
            {isOwner && <input type={"file"} onChange={mainPhotoSelected} />}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    )
}

export default ProfileInfo;