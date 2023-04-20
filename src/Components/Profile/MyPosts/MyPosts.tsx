import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import AddNewPostForm from './PostForm/AddNewPostForm';
import { PostType } from '../../../types/types';

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string)=>void
}

const MyPosts: React.FC<PropsType> = React.memo(props => {
        let postsElement = [...props.posts]
        .reverse()
        .map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);
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