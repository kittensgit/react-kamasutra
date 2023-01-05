import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css"


const DialogItem = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return(
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name='Noah' id='1'/>
                <DialogItem name='William' id='2'/>
                <DialogItem name='Michael' id='3'/>
                <DialogItem name='Ethan' id='4'/>
                <DialogItem name='Alexander' id='5'/>
                <DialogItem name='Jacob' id='6'/>
            </div>
            <div className={s.messages}>
                <Message message="Hi! It's my first message"/>
                <Message message="call me"/>
                <Message message="i'm eating right now"/>
            </div>
        </div>
    )
}

export default Dialogs;