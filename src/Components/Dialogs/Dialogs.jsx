import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Navigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

    let messagesElement = state.messages.map(m => <Message message={m.message} key={m.id} />);

    if (!props.isAuth) return <Navigate to="/login" />;

    return (
        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElement}</div>
            </div>

            <AddMessageForm sendMessage={props.sendMessage}/>

        </div>
    )
}

const AddMessageForm = (props) => {
    return (<div>

        <Formik initialValues={{
            newMessageBody: ''
        }}
            onSubmit={(values) => {
                props.sendMessage(values.newMessageBody)
            }}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Field as='textarea' name={'newMessageBody'} placeholder='Enter your message'></Field>
                    </div>
                    <button type={'submit'}>send</button>
                </Form>
            )}
        </Formik>

    </div>)
}

export default Dialogs;