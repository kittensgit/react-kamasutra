import React from 'react';
//@ts-ignore
import s from './MyPosts.module.css';
//@ts-ignore
import Post from './Post/Post.tsx';
//@ts-ignore
import AddNewPostForm from './PostForm/AddNewPostForm.tsx';
//@ts-ignore
import { PostType } from '../../../types/types.ts';

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}


const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props => {
    let postsElement = [...props.posts]
        .reverse()
        .map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />);
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

const MyPostsMemorised = React.memo(MyPosts)

export default MyPostsMemorised;