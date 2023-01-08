import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'

export default function MyPosts(props) {

    let postsElement = props.posts.map( p =>  <Post message={p.message} likesCount={p.likesCount} /> );

    let newPostElement = React.createRef();

    let AddPost = () => {
        props.addPost()
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.postsBlock}>
            <h2>my posts</h2>
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText} />
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
