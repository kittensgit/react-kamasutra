import React from 'react'
import s from './Post.module.css'

export default function Post(props) {
    return (
        <div className={s.item}>
            <img src='https://cdn-icons-png.flaticon.com/512/147/147144.png' alt='img'/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}
