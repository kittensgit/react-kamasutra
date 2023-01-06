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

let dialogs=[
    {name: 'Noah', id: 1},
    {name: 'William', id: 2},
    {name: 'Michael', id: 3},
    {name: 'Ethan', id: 4},
    {name: 'Alexander', id: 5},
    {name: 'Jacob', id: 6},
]

let messages=[
    {message: "Hi! It's my first message", id: 1},
    {message: "call me", id: 2},
    {message: "i'm eating right now", id: 3},
    {message: "cucumber", id: 4},
    {message: "potato", id: 5},
]

let dialogsElements = dialogs.map( d => <DialogItem name={d.name} id={d.id} />);
let messagesElement = messages.map( m => <Message message={m.message} />)

const Dialogs = (props) => {

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>
        </div>
    )
}

export default Dialogs;