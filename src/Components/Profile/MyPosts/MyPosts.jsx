import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import AddNewPostForm from './PostForm/AddNewPostForm';

const MyPosts = React.memo(props => {
        let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);
        return (
            <div className={s.postsBlock}>
                <h2>my posts</h2>

                <AddNewPostForm addPost={props.addPost} />

                <div className={s.posts}>
                    {postsElement}
                </div>
            </div>
        )
})

export default MyPosts;