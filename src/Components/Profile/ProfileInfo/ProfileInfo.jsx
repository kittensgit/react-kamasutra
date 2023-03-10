import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';

function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            {/* <div>
                <img src='https://img.freepik.com/free-vector/vibrant-background-with-diagonal-lines-effect-design_1017-28226.jpg?w=996&t=st=1672660654~exp=1672661254~hmac=55cbc4ce2d93ba8fc3ff82adbe3fdde319ab7760d89dca9bcd138f0f06b2fa83' alt='img'/>
            </div> */}
            <img src={props.profile.photos.large} alt='ava'/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
        </div>
    )
}

export default ProfileInfo;