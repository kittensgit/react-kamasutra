import { Formik, Form, Field } from 'formik';
import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'


const MyPosts = (props) => {

    let postsElement = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

    return (
        <div className={s.postsBlock}>
            <h2>my posts</h2>

            <AddNewPostForm addPost={props.addPost}/>

            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

const AddNewPostForm = (props) => {
    return (<div>

        <Formik initialValues={{
            newPostText: ''
        }
        }
        onSubmit={(values) => {
            props.addPost(values.newPostText)
        }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Field as='textarea' name={'newPostText'}  placeholder='Enter your post'/>
                    </div>
                    <button type={'submit'}>add post</button>
                </Form>
            )}
        </Formik>

    </div>)
}

export default MyPosts;