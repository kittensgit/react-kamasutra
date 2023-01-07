import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'

export default function MyPosts(props) {

    let postsElement = props.posts.map( p =>  <Post message={p.message} likesCount={p.likesCount} /> );

    let newPostElement = React.createRef();

    let AddPost = () => {
        let text = newPostElement.current.value;
        props.addPost(text)
    }

    return (
        <div className={s.postsBlock}>
            <h2>my posts</h2>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={AddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}
