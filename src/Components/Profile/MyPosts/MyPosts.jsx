import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'

export default function MyPosts() {
    return (
        <div className={s.postsBlock}>
            <h2>my posts</h2>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                <Post message="hi, how are you?" likesCount='0' />
                <Post message="it's my first post" likesCount='23' />
            </div>
        </div>
    )
}
