import React from "react";
//@ts-ignore
import addNewPostFormSchema from '../../../../utils/validators/AddNewPostFormSchema.ts';
import { Formik, Form, Field, ErrorMessage } from 'formik';
//@ts-ignore
import s from './AddNewPostForm.module.css';

type PropsType = {
    addPost: (newPostText: string)=>void
}

const AddNewPostForm:React.FC<PropsType> = (props) => {
    return (<div>

        <Formik initialValues={{
            newPostText: ''
        }
        }
            onSubmit={(values) => {
                props.addPost(values.newPostText)
            }}
            validationSchema={addNewPostFormSchema}
        >
            {({ handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Field as='textarea' name={'newPostText'} placeholder='Enter your post'
                            className={errors.newPostText && touched.newPostText ? `${s.field}` : ''} />
                    </div>
                    <ErrorMessage name="newPostText" component="div" className={s.errorMes}/>
                    <button type={'submit'}>add post</button>
                </Form>
            )}
        </Formik>

    </div>)
}

export default AddNewPostForm;