import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'

export default function MyPosts() {

    let posts=[
        {message: "hi, how are you?", id: 1, likesCount: 12},
        {message: "it's my first post", id: 2, likesCount: 10},
    ]

    let postsElement = posts.map( p =>  <Post message={p.message} likesCount={p.likesCount} /> );

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
                {postsElement}
            </div>
        </div>
    )
}
