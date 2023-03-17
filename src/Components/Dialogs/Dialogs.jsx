import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Navigate } from "react-router-dom";
import AddMessageForm from "./DialogForm/AddMessageForm";

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

            <AddMessageForm sendMessage={props.sendMessage} />

        </div>
    )
}

export default Dialogs;