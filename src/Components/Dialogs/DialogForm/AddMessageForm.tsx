import React from "react";
//@ts-ignore
import s from "./AddMessageForm.module.css"
import { Formik, Form, Field, ErrorMessage } from "formik";
//@ts-ignore
import addNewMessageFormSchema from "../../../utils/validators/AddNewMessageFormShema.ts";

type PropsType = {
    sendMessage: (messageText: string)=>void
}

const AddMessageForm:React.FC<PropsType> = (props) => {
    return (<div>

        <Formik
            initialValues={{
                newMessageBody: ''
            }}
            onSubmit={(values) => {
                props.sendMessage(values.newMessageBody)
            }}
            validationSchema={addNewMessageFormSchema}
        >
            {({ handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Field as='textarea' name={'newMessageBody'} placeholder='Enter your post'
                            className={errors.newMessageBody && touched.newMessageBody ? `${s.field}` : ''} />
                    </div>
                    <ErrorMessage name="newMessageBody" component="div" className={s.errorMes} />
                    <button type={'submit'}>send</button>
                </Form>
            )}
        </Formik>

    </div>)
}

export default AddMessageForm;