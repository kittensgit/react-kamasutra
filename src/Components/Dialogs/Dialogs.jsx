import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../redux/state";

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

    let messagesElement = props.state.messages.map(m => <Message message={m.message} />)

    let newMessageElement = React.createRef();

    let sendMessage = () => {
        let action = addMessageActionCreator();
        props.dispatch(action)
    }

    let onMessageChange = () => {
        let message = newMessageElement.current.value;
        let action = updateNewMessageTextActionCreator(message)
        props.dispatch(action);
    }

    return (
        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElement}
                <textarea ref={newMessageElement} onChange={onMessageChange} value={props.newMessageText} />
                <button onClick={sendMessage}>Send</button>
            </div>

        </div>
    )
}

export default Dialogs;