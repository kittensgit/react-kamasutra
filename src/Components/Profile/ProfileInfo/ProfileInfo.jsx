import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import s from './ProfileInfo.module.css';
import ProfileDataForm from './ProfileDataForm';

function ProfileInfo({ profile, status, updateStatus, isOwner, savePhoto, saveProfile}) {

    const [editMode, setEditMode] = useState(false)

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
            <img src={profile.photos.large || userPhoto} alt='ava' className={s.mainPhoto} />
            {isOwner && <input type={"file"} onChange={mainPhotoSelected} />}
            {editMode
                ? <ProfileDataForm saveProfile={saveProfile} profile={profile} setEditMode={setEditMode}/>
                : <ProfileData isOwner={isOwner} profile={profile} goToEditMode={() => { setEditMode(true) }} />}
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            {profile.lookingForAJob && <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>}
            <div>
                <b>About me</b>:{profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div>
        </div>
    )
}

export const Contact = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo;