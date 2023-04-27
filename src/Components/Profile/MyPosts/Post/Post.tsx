import React from 'react';
//@ts-ignore
import s from './Post.module.css';

type PropsType = {
    message: string | null
    likesCount: number | null
}

const Post:React.FC<PropsType>=(props)=> {
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

export default Post;
