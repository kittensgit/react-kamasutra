import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//@ts-ignore
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer.ts'
import { AnyAction } from 'redux'
//@ts-ignore
import { AppStateType } from '../../redux/redux-store.ts'

export type ChatMessageType = {
    message: string
    userId: number
    photo: string
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening() as unknown as AnyAction)
        return () => {
            dispatch(stopMessagesListening() as unknown as AnyAction)
        }
    }, [])

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img alt='auth' src={message.photo} style={{
                width: '30px'
            }} />
            <b>{message.userName}</b>
            <br />
            <p>{message.message}</p>
            <hr />
        </div>
    )
}

const Messages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()


    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message) as unknown as AnyAction)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessageHandler}>send</button>
            </div>
        </div>
    )
}



export default ChatPage;