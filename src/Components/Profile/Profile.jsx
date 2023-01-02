import React from 'react';
import classes from "./Profile.module.css"

function Profile() {
  return (
    <div className={classes.content}>
      <div>
        <img src='https://img.freepik.com/free-vector/vibrant-background-with-diagonal-lines-effect-design_1017-28226.jpg?w=996&t=st=1672660654~exp=1672661254~hmac=55cbc4ce2d93ba8fc3ff82adbe3fdde319ab7760d89dca9bcd138f0f06b2fa83' />
      </div>
      <div>
        ava desk
      </div>
      <div>
        my posts
        <div>
          new posts
        </div>
        <div className={classes.posts}>
          <div className={classes.item}>
            post 1
          </div>
          <div className='item'>
            post 2
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;